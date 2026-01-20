export default function Logo() {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id="bg_gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stop-color="#FFCA28" />
                    <stop offset="100%" stop-color="#FB8C00" />
                </linearGradient>
            </defs>

            <rect
                x="0"
                y="0"
                width="512"
                height="512"
                rx="110"
                ry="110"
                fill="url(#bg_gradient)"
            />

            <g transform="rotate(45, 256, 256)">
                <path
                    fill="#ffffff"
                    d="
      M 256 125 
      A 65 65 0 1 1 231 245 
      L 231 370 
      A 5 5 0 0 0 236 375
      L 276 375
      A 5 5 0 0 0 281 370
      L 281 345
      L 296 345
      A 4 4 0 0 0 300 341
      L 300 324
      A 4 4 0 0 0 296 320
      L 281 320
      L 281 295
      L 296 295
      A 4 4 0 0 0 300 291
      L 300 274
      A 4 4 0 0 0 296 270
      L 281 270
      L 281 245
      A 65 65 0 0 1 256 125
      Z
      
      M 256 170
      A 20 20 0 1 0 256 210
      A 20 20 0 1 0 256 170
      Z"
                />
            </g>
        </svg>
    );
}
