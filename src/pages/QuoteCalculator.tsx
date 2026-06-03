import { useState } from 'react';
import { Calculator, ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuoteCalculator() {
  // ==========================================
  // SETTINGS
  // Change these values to update the calculator
  // ==========================================
  const SETTINGS = {
    notaryFeePerSignature: 10,
    irsMileageRate: 0.725
  };

  const [signatures, setSignatures] = useState<number>(1);
  const [miles, setMiles] = useState<number>(10);
  const [locationType, setLocationType] = useState<string>('Home');
  const [address, setAddress] = useState<string>('');
  const [isCalculatingDistance, setIsCalculatingDistance] = useState<boolean>(false);
  const [distanceError, setDistanceError] = useState<string>('');

  const calculateRealMiles = async () => {
    if (!address.trim()) {
      setDistanceError('Please enter an address.');
      return;
    }
    setIsCalculatingDistance(true);
    setDistanceError('');

    try {
      // 1. Geocode the address using Nominatim (OpenStreetMap)
      const geocodeRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', NC')}&limit=1`);
      const geocodeData = await geocodeRes.json();

      if (!geocodeData || geocodeData.length === 0) {
        throw new Error('Address not found. Please try adding a city or zip code.');
      }

      const destLat = parseFloat(geocodeData[0].lat);
      const destLon = parseFloat(geocodeData[0].lon);

      // Mint Hill, NC coordinates
      const originLat = 35.1813;
      const originLon = -80.6556;

      // 2. Calculate driving distance using OSRM
      const routeRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${originLon},${originLat};${destLon},${destLat}?overview=false`);
      const routeData = await routeRes.json();

      if (routeData.code !== 'Ok' || !routeData.routes || routeData.routes.length === 0) {
        throw new Error('Could not calculate driving route.');
      }

      const distanceMeters = routeData.routes[0].distance;
      const distanceMiles = distanceMeters * 0.000621371;
      
      // Round trip
      const roundTripMiles = distanceMiles * 2;
      
      setMiles(Number(roundTripMiles.toFixed(1)));
    } catch (err: any) {
      setDistanceError(err.message || 'An error occurred while calculating distance.');
    } finally {
      setIsCalculatingDistance(false);
    }
  };

  const notaryFee = Math.max(0, signatures) * SETTINGS.notaryFeePerSignature;
  const travelFee = Math.max(0, miles) * SETTINGS.irsMileageRate;
  const totalQuote = notaryFee + travelFee;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-blue-950 p-6 sm:p-8 text-white flex items-center gap-4">
            <div className="bg-blue-800 p-3 rounded-xl">
              <Calculator className="w-8 h-8 text-blue-200" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif">Quote Calculator</h1>
              <p className="text-blue-200 mt-1">Estimate your mobile notary appointment cost. This is just an estimate and prices will be finalized at appointment confirmation.</p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="signatures" className="block text-sm font-semibold text-slate-700 mb-2">
                    Number of notarized signatures
                  </label>
                  <input
                    type="number"
                    id="signatures"
                    min="0"
                    value={signatures}
                    onChange={(e) => setSignatures(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="miles" className="block text-sm font-semibold text-slate-700 mb-2">
                    Round-trip miles
                  </label>
                  <input
                    type="number"
                    id="miles"
                    min="0"
                    step="0.1"
                    value={miles}
                    onChange={(e) => setMiles(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-2">
                    Appointment location type
                  </label>
                  <select
                    id="location"
                    value={locationType}
                    onChange={(e) => setLocationType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Nursing Home">Nursing Home</option>
                    <option value="Assisted Living">Assisted Living</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Location type is informational only and does not add extra fees.
                  </p>
                </div>
              </div>

              {/* Summary Section */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-center">
                <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Quote Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-slate-700">Notary Fee</p>
                      <p className="text-sm text-slate-500">{signatures} signatures × ${SETTINGS.notaryFeePerSignature.toFixed(2)}</p>
                    </div>
                    <p className="font-semibold text-slate-900">${notaryFee.toFixed(2)}</p>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-slate-700">Travel Reimbursement</p>
                      <p className="text-sm text-slate-500">{miles} miles × ${SETTINGS.irsMileageRate.toFixed(3)}</p>
                    </div>
                    <p className="font-semibold text-slate-900">${travelFee.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 flex justify-between items-end">
                  <p className="text-lg font-bold text-slate-900">Estimated Total</p>
                  <p className="text-3xl font-bold text-blue-600">${totalQuote.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Address Lookup Section */}
            <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                Calculate Exact Mileage
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <label htmlFor="address" className="sr-only">Appointment Address</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter appointment address (e.g., 123 Main St, Charlotte, NC)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && calculateRealMiles()}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                  />
                </div>
                <button
                  onClick={calculateRealMiles}
                  disabled={isCalculatingDistance}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 whitespace-nowrap flex items-center justify-center"
                >
                  {isCalculatingDistance ? 'Calculating...' : 'Calculate Miles'}
                </button>
              </div>
              {distanceError && <p className="text-red-600 text-sm mt-2">{distanceError}</p>}
              <p className="text-slate-500 text-sm mt-2">
                Calculates round-trip driving distance from our office in Mint Hill, NC.
              </p>
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
              <p className="text-sm text-blue-900">
                <strong>Disclaimer:</strong> In North Carolina, the notary fee is $10 per notarized principal signature. Mobile notaries may also charge travel reimbursement at the IRS mileage rate ($0.725 per mile), which must be agreed to before the appointment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
