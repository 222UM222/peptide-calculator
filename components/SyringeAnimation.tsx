import React from 'react';

export type SyringeSize = 30 | 50 | 100;

interface SyringeAnimationProps {
  units: number;
  size?: SyringeSize;
}

export function SyringeAnimation({ units, size = 100 }: SyringeAnimationProps) {
  // Calculate pixels based on syringe size
  // All syringes in the SVG use a 360px width for the full capacity
  // 100 units -> 360px (1 unit = 3.6px)
  // 50 units -> 360px (1 unit = 7.2px)
  // 30 units -> 360px (1 unit = 12px)
  
  const maxUnits = size;
  const safeUnits = Math.min(Math.max(units, 0), maxUnits);
  
  let pixelsPerUnit = 3.6;
  if (size === 50) pixelsPerUnit = 7.2;
  if (size === 30) pixelsPerUnit = 12.0;
  
  const fillPixels = safeUnits * pixelsPerUnit;

  // We use a smaller viewBox width to make the syringe appear larger (zoom in)
  // The original SVG was 1200 wide but content ends around x=650
  const viewBox = "0 0 700 200";

  // Blue liquid gradient
  const liquidGradient = (id: string) => (
    <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#aaddff" stopOpacity="0.4" />
      <stop offset="50%" stopColor="#ddeeFF" stopOpacity="0.6" />
      <stop offset="100%" stopColor="#aaddff" stopOpacity="0.4" />
    </linearGradient>
  );

  if (size === 30) {
    return (
      <svg width="100%" height="100%" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="needleGrad30" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#555" />
            <stop offset="40%" stopColor="#eee" />
            <stop offset="60%" stopColor="#ccc" />
            <stop offset="100%" stopColor="#555" />
          </linearGradient>
          <linearGradient id="barrelGrad30" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eef4fa" stopOpacity="0.4" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="80%" stopColor="#eef4fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#bdcfe0" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="rodGrad30" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ccc" />
            <stop offset="30%" stopColor="#fff" />
            <stop offset="50%" stopColor="#eee" />
            <stop offset="70%" stopColor="#fff" />
            <stop offset="100%" stopColor="#bbb" />
          </linearGradient>
          {liquidGradient("liquidGrad30")}
          <style>
            {`
              .plunger-anim-30 {
                transition: transform 1s ease-in-out;
                transform: translateX(${fillPixels}px);
              }
              .liquid-anim-30 {
                transition: width 1s ease-in-out;
                width: ${fillPixels}px;
              }
            `}
          </style>
        </defs>

        {/* White Background to ensure visibility in dark mode */}
        <rect x="40" y="0" width="620" height="200" fill="#ffffff" rx="12" opacity="0.05" />
        <rect x="50" y="0" width="600" height="200" fill="none" />

        <g transform="translate(50, 80)">
          {/* Needle & Hub */}
          <rect x="0" y="19" width="80" height="2" fill="url(#needleGrad30)" />
          <path d="M0,19 L-5,19 L0,21 Z" fill="#333" />
          <path d="M80,15 L100,10 L100,30 L80,25 Z" fill="#dceefc" stroke="#999" strokeWidth="0.5" />
          <rect x="75" y="17" width="5" height="6" fill="#ccc" />

          {/* Barrel Body - Added white fill behind */}
          <rect x="100" y="5" width="445" height="30" rx="2" fill="#fff" stroke="none" />
          <rect x="100" y="5" width="445" height="30" rx="2" fill="url(#barrelGrad30)" stroke="#8899a6" strokeWidth="1" />

          {/* Liquid */}
          <rect x="103" y="7" height="26" fill="url(#liquidGrad30)" className="liquid-anim-30" />

          {/* Plunger Group */}
          <g className="plunger-anim-30">
            <path d="M103,7 L118,7 L118,33 L103,33 Q99,20 103,7 Z" fill="#111" />
            <line x1="108" y1="7" x2="108" y2="33" stroke="#333" strokeWidth="1.5" />
            <line x1="113" y1="7" x2="113" y2="33" stroke="#333" strokeWidth="1.5" />
            <rect x="118" y="14" width="430" height="12" fill="url(#rodGrad30)" opacity="0.6" />
            <rect x="545" y="14" width="60" height="12" fill="url(#rodGrad30)" stroke="#bbb" strokeWidth="0.5"/>
            <rect x="605" y="6" width="5" height="28" rx="1" fill="#fcfcfc" stroke="#999" />
          </g>

          {/* Flange */}
          <path d="M540,5 L545,5 L545,-8 L552,-8 L552,48 L545,48 L545,35 L540,35 Z" fill="url(#barrelGrad30)" stroke="#8899a6" strokeWidth="1" opacity="0.9"/>

          {/* U-30 MARKINGS - Back to black for contrast against white barrel */}
          <g transform="translate(100, 0)">
            <g stroke="#000" strokeWidth="1"> 
              {/* Major Ticks */}
              <line x1="3" y1="5" x2="3" y2="15" strokeWidth="1.5"/> 
              <line x1="63" y1="5" x2="63" y2="15" strokeWidth="1.5"/> 
              <line x1="123" y1="5" x2="123" y2="15" strokeWidth="1.5"/>
              <line x1="183" y1="5" x2="183" y2="15" strokeWidth="1.5"/>
              <line x1="243" y1="5" x2="243" y2="15" strokeWidth="1.5"/>
              <line x1="303" y1="5" x2="303" y2="15" strokeWidth="1.5"/> 
              <line x1="363" y1="5" x2="363" y2="15" strokeWidth="1.5"/>

              {/* Minor Ticks */}
              <line x1="15" y1="5" x2="15" y2="10" /> <line x1="27" y1="5" x2="27" y2="10" /> <line x1="39" y1="5" x2="39" y2="10" /> <line x1="51" y1="5" x2="51" y2="10" />
              <line x1="75" y1="5" x2="75" y2="10" /> <line x1="87" y1="5" x2="87" y2="10" /> <line x1="99" y1="5" x2="99" y2="10" /> <line x1="111" y1="5" x2="111" y2="10" />
              
              {/* Dashed pattern for remaining ticks */}
              <path d="M123,7 L363,7" stroke="#444" strokeWidth="5" strokeDasharray="1, 11" opacity="0.3" fill="none"/>
            </g>

            {/* Numbers - Back to black */}
            <g fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#000" textAnchor="middle"> 
              <text x="63" y="25" transform="rotate(90, 63, 25)">5</text>
              <text x="123" y="25" transform="rotate(90, 123, 25)">10</text>
              <text x="183" y="25" transform="rotate(90, 183, 25)">15</text>
              <text x="243" y="25" transform="rotate(90, 243, 25)">20</text>
              <text x="303" y="25" transform="rotate(90, 303, 25)">25</text>
              <text x="363" y="25" transform="rotate(90, 363, 25)">30</text>
              <text x="390" y="20" fontSize="8" transform="rotate(90, 390, 20)">UNITS</text>
            </g>
          </g>

          {/* Glass Highlights */}
          <line x1="105" y1="30" x2="540" y2="30" stroke="#fff" strokeWidth="2" opacity="0.4" />
          <rect x="100" y="5" width="445" height="10" fill="#fff" opacity="0.15" rx="2" />
        </g>
      </svg>
    );
  }

  if (size === 50) {
    return (
      <svg width="100%" height="100%" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="needleGrad50" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#555" />
            <stop offset="40%" stopColor="#eee" />
            <stop offset="60%" stopColor="#ccc" />
            <stop offset="100%" stopColor="#555" />
          </linearGradient>
          <linearGradient id="barrelGrad50" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eef4fa" stopOpacity="0.4" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="80%" stopColor="#eef4fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#bdcfe0" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="rodGrad50" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ccc" />
            <stop offset="30%" stopColor="#fff" />
            <stop offset="50%" stopColor="#eee" />
            <stop offset="70%" stopColor="#fff" />
            <stop offset="100%" stopColor="#bbb" />
          </linearGradient>
          {liquidGradient("liquidGrad50")}
          <style>
            {`
              .plunger-anim-50 {
                transition: transform 1s ease-in-out;
                transform: translateX(${fillPixels}px);
              }
              .liquid-anim-50 {
                transition: width 1s ease-in-out;
                width: ${fillPixels}px;
              }
            `}
          </style>
        </defs>

        {/* White Background */}
        <rect x="40" y="0" width="620" height="200" fill="#ffffff" rx="12" opacity="0.05" />

        <g transform="translate(50, 80)">
          {/* Needle & Hub */}
          <rect x="0" y="19" width="80" height="2" fill="url(#needleGrad50)" />
          <path d="M0,19 L-5,19 L0,21 Z" fill="#333" />
          <path d="M80,15 L100,10 L100,30 L80,25 Z" fill="#dceefc" stroke="#999" strokeWidth="0.5" />
          <rect x="75" y="17" width="5" height="6" fill="#ccc" />

          {/* Barrel Body - Added white fill behind */}
          <rect x="100" y="5" width="445" height="30" rx="2" fill="#fff" stroke="none" />
          <rect x="100" y="5" width="445" height="30" rx="2" fill="url(#barrelGrad50)" stroke="#8899a6" strokeWidth="1" />

          {/* Liquid */}
          <rect x="103" y="7" height="26" fill="url(#liquidGrad50)" className="liquid-anim-50" />

          {/* Plunger Group */}
          <g className="plunger-anim-50">
            <path d="M103,7 L118,7 L118,33 L103,33 Q99,20 103,7 Z" fill="#111" />
            <line x1="108" y1="7" x2="108" y2="33" stroke="#333" strokeWidth="1.5" />
            <line x1="113" y1="7" x2="113" y2="33" stroke="#333" strokeWidth="1.5" />
            <rect x="118" y="14" width="430" height="12" fill="url(#rodGrad50)" opacity="0.6" />
            <rect x="545" y="14" width="60" height="12" fill="url(#rodGrad50)" stroke="#bbb" strokeWidth="0.5"/>
            <rect x="605" y="6" width="5" height="28" rx="1" fill="#fcfcfc" stroke="#999" />
          </g>

          {/* Flange */}
          <path d="M540,5 L545,5 L545,-8 L552,-8 L552,48 L545,48 L545,35 L540,35 Z" fill="url(#barrelGrad50)" stroke="#8899a6" strokeWidth="1" opacity="0.9"/>

          {/* U-50 MARKINGS - Back to black */}
          <g transform="translate(100, 0)">
            <g stroke="#000" strokeWidth="1">
              {/* Major Ticks */}
              <line x1="3" y1="5" x2="3" y2="15" strokeWidth="1.5"/> 
              <line x1="39" y1="5" x2="39" y2="15" strokeWidth="1.5"/> 
              <line x1="75" y1="5" x2="75" y2="15" strokeWidth="1.5"/>
              <line x1="111" y1="5" x2="111" y2="15" strokeWidth="1.5"/>
              <line x1="147" y1="5" x2="147" y2="15" strokeWidth="1.5"/>
              <line x1="183" y1="5" x2="183" y2="15" strokeWidth="1.5"/> 
              <line x1="219" y1="5" x2="219" y2="15" strokeWidth="1.5"/>
              <line x1="255" y1="5" x2="255" y2="15" strokeWidth="1.5"/>
              <line x1="291" y1="5" x2="291" y2="15" strokeWidth="1.5"/>
              <line x1="327" y1="5" x2="327" y2="15" strokeWidth="1.5"/>
              <line x1="363" y1="5" x2="363" y2="15" strokeWidth="1.5"/> 

              {/* Minor Ticks Pattern */}
              <path d="M3,7 L363,7" stroke="#444" strokeWidth="4" strokeDasharray="1, 6.2" opacity="0.3" fill="none"/>
            </g>

            {/* Numbers - Back to black */}
            <g fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#000" textAnchor="middle">
              <text x="39" y="25" transform="rotate(90, 39, 25)">5</text>
              <text x="75" y="25" transform="rotate(90, 75, 25)">10</text>
              <text x="111" y="25" transform="rotate(90, 111, 25)">15</text>
              <text x="147" y="25" transform="rotate(90, 147, 25)">20</text>
              <text x="183" y="25" transform="rotate(90, 183, 25)">25</text>
              <text x="219" y="25" transform="rotate(90, 219, 25)">30</text>
              <text x="255" y="25" transform="rotate(90, 255, 25)">35</text>
              <text x="291" y="25" transform="rotate(90, 291, 25)">40</text>
              <text x="327" y="25" transform="rotate(90, 327, 25)">45</text>
              <text x="363" y="25" transform="rotate(90, 363, 25)">50</text>
              <text x="390" y="20" fontSize="8" transform="rotate(90, 390, 20)">UNITS</text>
            </g>
          </g>

          {/* Glass Highlights */}
          <line x1="105" y1="30" x2="540" y2="30" stroke="#fff" strokeWidth="2" opacity="0.4" />
          <rect x="100" y="5" width="445" height="10" fill="#fff" opacity="0.15" rx="2" />
        </g>
      </svg>
    );
  }

  // Default 100 units
  return (
    <svg width="100%" height="100%" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="needleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#555" />
          <stop offset="40%" stopColor="#eee" />
          <stop offset="60%" stopColor="#ccc" />
          <stop offset="100%" stopColor="#555" />
        </linearGradient>

        <linearGradient id="barrelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#eef4fa" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="80%" stopColor="#eef4fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#bdcfe0" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="rodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ccc" />
          <stop offset="30%" stopColor="#fff" />
          <stop offset="50%" stopColor="#eee" />
          <stop offset="70%" stopColor="#fff" />
          <stop offset="100%" stopColor="#bbb" />
        </linearGradient>
        {liquidGradient("liquidGrad")}
        <style>
          {`
            .plunger-anim {
              transition: transform 1s ease-in-out;
              transform: translateX(${fillPixels}px);
            }
            .liquid-anim {
              transition: width 1s ease-in-out;
              width: ${fillPixels}px;
            }
          `}
        </style>
      </defs>

      {/* White Background */}
      <rect x="40" y="0" width="620" height="200" fill="#ffffff" rx="12" opacity="0.05" />

      <g transform="translate(50, 80)">
        {/* Needle & Hub */}
        <rect x="0" y="19" width="80" height="2" fill="url(#needleGrad)" />
        <path d="M0,19 L-5,19 L0,21 Z" fill="#333" />
        <path d="M80,15 L100,10 L100,30 L80,25 Z" fill="#dceefc" stroke="#999" strokeWidth="0.5" />
        <rect x="75" y="17" width="5" height="6" fill="#ccc" />

        {/* Barrel Body - Added white fill behind */}
        <rect x="100" y="5" width="445" height="30" rx="2" fill="#fff" stroke="none" />
        <rect x="100" y="5" width="445" height="30" rx="2" fill="url(#barrelGrad)" stroke="#8899a6" strokeWidth="1" />

        {/* Liquid */}
        <rect x="103" y="7" height="26" fill="url(#liquidGrad)" className="liquid-anim" />

        {/* Plunger Group */}
        <g className="plunger-anim">
            <path d="M103,7 L118,7 L118,33 L103,33 Q99,20 103,7 Z" fill="#111" />
            <line x1="108" y1="7" x2="108" y2="33" stroke="#333" strokeWidth="1.5" />
            <line x1="113" y1="7" x2="113" y2="33" stroke="#333" strokeWidth="1.5" />
            <rect x="118" y="14" width="430" height="12" fill="url(#rodGrad)" opacity="0.6" />
            <rect x="545" y="14" width="60" height="12" fill="url(#rodGrad)" stroke="#bbb" strokeWidth="0.5"/>
            <rect x="605" y="6" width="5" height="28" rx="1" fill="#fcfcfc" stroke="#999" />
        </g>

        {/* Flange */}
        <path d="M540,5 L545,5 L545,-8 L552,-8 L552,48 L545,48 L545,35 L540,35 Z" fill="url(#barrelGrad)" stroke="#8899a6" strokeWidth="1" opacity="0.9"/>

        {/* Markings - Back to black */}
        <g transform="translate(100, 0)">
          <g stroke="#000" strokeWidth="1">
             {/* Major Ticks */}
             <line x1="3" y1="5" x2="3" y2="15" strokeWidth="1.5"/> 
             <line x1="39" y1="5" x2="39" y2="15" strokeWidth="1.5"/> 
             <line x1="75" y1="5" x2="75" y2="15" strokeWidth="1.5"/>
             <line x1="111" y1="5" x2="111" y2="15" strokeWidth="1.5"/>
             <line x1="147" y1="5" x2="147" y2="15" strokeWidth="1.5"/>
             <line x1="183" y1="5" x2="183" y2="15" strokeWidth="1.5"/> 
             <line x1="219" y1="5" x2="219" y2="15" strokeWidth="1.5"/>
             <line x1="255" y1="5" x2="255" y2="15" strokeWidth="1.5"/>
             <line x1="291" y1="5" x2="291" y2="15" strokeWidth="1.5"/>
             <line x1="327" y1="5" x2="327" y2="15" strokeWidth="1.5"/>
             <line x1="363" y1="5" x2="363" y2="15" strokeWidth="1.5"/> 

             {/* Minor Tick Pattern */}
             <path d="M3,7 L363,7" stroke="#444" strokeWidth="4" strokeDasharray="1, 2.6" opacity="0.3" fill="none"/>
          </g>

          {/* Numbers - Back to black */}
          <g fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#000" textAnchor="middle">
            <text x="39" y="25" transform="rotate(90, 39, 25)">10</text>
            <text x="75" y="25" transform="rotate(90, 75, 25)">20</text>
            <text x="111" y="25" transform="rotate(90, 111, 25)">30</text>
            <text x="147" y="25" transform="rotate(90, 147, 25)">40</text>
            <text x="183" y="25" transform="rotate(90, 183, 25)">50</text>
            <text x="219" y="25" transform="rotate(90, 219, 25)">60</text>
            <text x="255" y="25" transform="rotate(90, 255, 25)">70</text>
            <text x="291" y="25" transform="rotate(90, 291, 25)">80</text>
            <text x="327" y="25" transform="rotate(90, 327, 25)">90</text>
            <text x="363" y="25" transform="rotate(90, 363, 25)">100</text>
            <text x="390" y="20" fontSize="8" transform="rotate(90, 390, 20)">UNITS</text>
          </g>
        </g>

        {/* Highlights */}
        <line x1="105" y1="30" x2="540" y2="30" stroke="#fff" strokeWidth="2" opacity="0.4" />
        <rect x="100" y="5" width="445" height="10" fill="#fff" opacity="0.15" rx="2" />
      </g>
    </svg>
  );
}
