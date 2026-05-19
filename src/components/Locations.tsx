<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3A6EA8"/>
      <stop offset="55%" stop-color="#7AAED4"/>
      <stop offset="100%" stop-color="#B8D8EE"/>
    </linearGradient>
    <linearGradient id="ground2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6EAF60"/>
      <stop offset="100%" stop-color="#4E9040"/>
    </linearGradient>
    <linearGradient id="church-wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F5F0E8"/>
      <stop offset="100%" stop-color="#E8E0D0"/>
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="480" fill="url(#sky2)"/>

  <!-- Sun with warm afternoon glow -->
  <circle cx="90" cy="90" r="50" fill="#FFD966" opacity="0.85"/>
  <circle cx="90" cy="90" r="38" fill="#FFE999"/>

  <!-- Clouds -->
  <g opacity="0.88">
    <ellipse cx="310" cy="75" rx="80" ry="28" fill="white"/>
    <ellipse cx="350" cy="63" rx="58" ry="25" fill="white"/>
    <ellipse cx="275" cy="72" rx="48" ry="22" fill="#F0F8FF"/>
  </g>
  <g opacity="0.75">
    <ellipse cx="590" cy="95" rx="70" ry="26" fill="white"/>
    <ellipse cx="625" cy="85" rx="50" ry="22" fill="white"/>
  </g>

  <!-- Background hills -->
  <ellipse cx="400" cy="340" rx="500" ry="90" fill="#5E9E52" opacity="0.5"/>
  <ellipse cx="150" cy="330" rx="220" ry="75" fill="#6BAF5C" opacity="0.45"/>
  <ellipse cx="680" cy="335" rx="240" ry="80" fill="#68AC58" opacity="0.45"/>

  <!-- Dense tree line (Locust is heavily wooded Stanly County) -->
  <!-- Left trees -->
  <rect x="30" y="262" width="12" height="75" fill="#5C3D1E"/>
  <ellipse cx="36" cy="250" rx="38" ry="46" fill="#1A5C1A"/>
  <ellipse cx="20" cy="262" rx="26" ry="34" fill="#226622"/>
  <ellipse cx="55" cy="258" rx="24" ry="32" fill="#145214"/>

  <rect x="88" y="268" width="10" height="68" fill="#5C3D1E"/>
  <ellipse cx="93" cy="256" rx="32" ry="40" fill="#1E6B1E"/>
  <ellipse cx="78" cy="266" rx="22" ry="30" fill="#257025"/>

  <!-- Right trees -->
  <rect x="700" y="260" width="12" height="76" fill="#5C3D1E"/>
  <ellipse cx="706" cy="248" rx="38" ry="46" fill="#1A5C1A"/>
  <ellipse cx="688" cy="260" rx="26" ry="34" fill="#226622"/>
  <ellipse cx="724" cy="257" rx="24" ry="32" fill="#145214"/>

  <rect x="750" y="265" width="10" height="70" fill="#5C3D1E"/>
  <ellipse cx="755" cy="253" rx="32" ry="40" fill="#1E6B1E"/>
  <ellipse cx="768" cy="261" rx="22" ry="30" fill="#257025"/>

  <!-- Ground -->
  <rect x="0" y="345" width="800" height="135" fill="url(#ground2)"/>
  <ellipse cx="400" cy="345" rx="500" ry="38" fill="#6EAF60"/>

  <!-- Grass texture lines -->
  <path d="M0 375 Q200 368 400 372 Q600 376 800 370" fill="none" stroke="#4E9040" stroke-width="2" opacity="0.5"/>
  <path d="M0 395 Q200 388 400 392 Q600 396 800 390" fill="none" stroke="#4E9040" stroke-width="2" opacity="0.4"/>

  <!-- Main street / road -->
  <polygon points="330,480 470,480 445,345 355,345" fill="#9A9A9A"/>
  <line x1="400" y1="350" x2="400" y2="480" stroke="white" stroke-width="3" stroke-dasharray="18,14" opacity="0.55"/>
  <!-- Sidewalk -->
  <polygon points="326,480 340,480 360,345 330,345" fill="#C2BAA8" opacity="0.6"/>
  <polygon points="460,480 474,480 470,345 440,345" fill="#C2BAA8" opacity="0.6"/>

  <!-- === SMALL TOWN CHURCH (Locust feels like classic Piedmont NC small town) === -->
  <!-- Base -->
  <rect x="295" y="270" width="90" height="80" fill="url(#church-wall)"/>
  <!-- Nave roof -->
  <polygon points="285,272 395,272 380,245 310,245" fill="#8C7A6B"/>
  <!-- Steeple base -->
  <rect x="328" y="220" width="24" height="32" fill="url(#church-wall)"/>
  <!-- Steeple roof -->
  <polygon points="324,222 356,222 340,180" fill="#8C7A6B"/>
  <!-- Cross -->
  <line x1="340" y1="170" x2="340" y2="196" stroke="#C8B89A" stroke-width="3.5"/>
  <line x1="332" y1="178" x2="348" y2="178" stroke="#C8B89A" stroke-width="3.5"/>
  <!-- Church door arch -->
  <rect x="327" y="316" width="26" height="34" rx="13" fill="#8B6F47"/>
  <rect x="327" y="330" width="26" height="20" fill="#8B6F47"/>
  <!-- Arched windows -->
  <rect x="300" y="278" width="20" height="28" rx="10" fill="#AED6F1" stroke="#9A8878" stroke-width="2"/>
  <rect x="360" y="278" width="20" height="28" rx="10" fill="#AED6F1" stroke="#9A8878" stroke-width="2"/>
  <!-- Cross window on steeple -->
  <line x1="340" y1="226" x2="340" y2="240" stroke="#9A8878" stroke-width="2"/>
  <line x1="334" y1="231" x2="346" y2="231" stroke="#9A8878" stroke-width="2"/>

  <!-- === GENERAL STORE / SMALL SHOP === -->
  <rect x="155" y="288" width="110" height="68" fill="#E8D8C0"/>
  <!-- Flat roof parapet -->
  <rect x="150" y="282" width="120" height="12" fill="#C8A87A"/>
  <rect x="150" y="278" width="120" height="8" fill="#D4B48A"/>
  <!-- Sign board -->
  <rect x="162" y="286" width="96" height="14" fill="#8B5E2A"/>
  <text x="210" y="297" font-family="sans-serif" font-size="9" fill="#F5E6CC" text-anchor="middle" font-weight="bold">LOCUST GENERAL</text>
  <!-- Store windows -->
  <rect x="160" y="305" width="35" height="30" fill="#C8E6F5" stroke="#8B7355" stroke-width="2"/>
  <rect x="215" y="305" width="35" height="30" fill="#C8E6F5" stroke="#8B7355" stroke-width="2"/>
  <!-- Store door -->
  <rect x="192" y="315" width="22" height="41" fill="#7A5C35"/>
  <circle cx="212" cy="337" r="2.5" fill="#C8A870"/>
  <!-- Awning -->
  <polygon points="155,305 270,305 265,295 160,295" fill="#CC4422" opacity="0.85"/>
  <!-- Awning stripes -->
  <line x1="180" y1="295" x2="178" y2="305" stroke="white" stroke-width="2.5" opacity="0.5"/>
  <line x1="200" y1="295" x2="198" y2="305" stroke="white" stroke-width="2.5" opacity="0.5"/>
  <line x1="220" y1="295" x2="218" y2="305" stroke="white" stroke-width="2.5" opacity="0.5"/>
  <line x1="240" y1="295" x2="238" y2="305" stroke="white" stroke-width="2.5" opacity="0.5"/>

  <!-- === HOUSE RIGHT SIDE === -->
  <rect x="488" y="285" width="100" height="72" fill="#EDE0CC"/>
  <!-- Hip roof -->
  <polygon points="480,287 596,287 585,255 500,255" fill="#B85C3A"/>
  <!-- Door -->
  <rect x="528" y="315" width="22" height="42" rx="1" fill="#7A5030"/>
  <circle cx="548" cy="338" r="2.5" fill="#C8A860"/>
  <!-- Windows -->
  <rect x="494" y="296" width="26" height="20" rx="1" fill="#AED6F1" stroke="#7A5030" stroke-width="2"/>
  <line x1="507" y1="296" x2="507" y2="316" stroke="#7A5030" stroke-width="1.5"/>
  <line x1="494" y1="306" x2="520" y2="306" stroke="#7A5030" stroke-width="1.5"/>
  <rect x="560" y="296" width="26" height="20" rx="1" fill="#AED6F1" stroke="#7A5030" stroke-width="2"/>
  <line x1="573" y1="296" x2="573" y2="316" stroke="#7A5030" stroke-width="1.5"/>
  <line x1="560" y1="306" x2="586" y2="306" stroke="#7A5030" stroke-width="1.5"/>
  <!-- Porch column hints -->
  <rect x="520" y="300" width="5" height="57" fill="#D4C4A8"/>
  <rect x="555" y="300" width="5" height="57" fill="#D4C4A8"/>

  <!-- Mid-ground trees between buildings -->
  <rect x="145" y="302" width="8" height="40" fill="#5C3D1E"/>
  <ellipse cx="149" cy="294" rx="24" ry="30" fill="#2E7D32"/>
  <rect x="415" y="300" width="8" height="43" fill="#5C3D1E"/>
  <ellipse cx="419" cy="292" rx="22" ry="28" fill="#2E7D32"/>
  <rect x="480" y="305" width="8" height="40" fill="#5C3D1E"/>
  <ellipse cx="484" cy="297" rx="20" ry="26" fill="#388E3C"/>

  <!-- Street lamp -->
  <rect x="242" y="310" width="5" height="45" fill="#777"/>
  <path d="M244 310 Q258 302 262 308" fill="none" stroke="#777" stroke-width="3"/>
  <circle cx="263" cy="307" r="5" fill="#FFE566" opacity="0.85"/>

  <!-- Wildflowers / greenery -->
  <circle cx="40" cy="362" r="5" fill="#FFD700"/>
  <circle cx="58" cy="366" r="4" fill="#FF69B4"/>
  <circle cx="75" cy="360" r="4" fill="#FF8C69"/>
  <circle cx="720" cy="362" r="5" fill="#FFD700"/>
  <circle cx="740" cy="366" r="4" fill="#FF69B4"/>
  <circle cx="760" cy="360" r="4" fill="#FF8C69"/>
  <circle cx="260" cy="358" r="3.5" fill="#FFD700"/>
  <circle cx="540" cy="358" r="3.5" fill="#FF69B4"/>

  <!-- Label bar -->
  <rect x="0" y="418" width="800" height="62" fill="rgba(15,30,60,0.72)"/>
  <text x="400" y="456" font-family="Georgia, 'Times New Roman', serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle" letter-spacing="2">Locust, NC</text>
</svg>
