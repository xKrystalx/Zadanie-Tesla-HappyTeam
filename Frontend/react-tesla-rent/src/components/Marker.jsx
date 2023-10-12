import { Tooltip } from "react-tooltip";

export function Marker({ id, name, position, selectCallback }) {
  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-full flex flex-col items-center`}
      style={{ top: `${position.y}%`, left: `${position.x}%` }}
      id={`marker-${id}`}
    >
      <svg
        className="transition duration-200 ease-in hover:text-[--primary-red] z-0"
        viewBox="0 -256 1792 1792"
        id={`marker-image-${id}`}
        version="1.1"
        width="48px"
        height="48px"
      >
        <g transform="matrix(1,0,0,-1,364.47458,1270.2373)" id="g3027">
          <path
            d="m 768,896 q 0,106 -75,181 -75,75 -181,75 -106,0 -181,-75 -75,-75 -75,-181 0,-106 75,-181 75,-75 181,-75 106,0 181,75 75,75 75,181 z m 256,0 q 0,-109 -33,-179 L 627,-57 q -16,-33 -47.5,-52 -31.5,-19 -67.5,-19 -36,0 -67.5,19 Q 413,-90 398,-57 L 33,717 Q 0,787 0,896 q 0,212 150,362 150,150 362,150 212,0 362,-150 150,-150 150,-362 z"
            fill="currentColor"
          />
        </g>
      </svg>
      <Tooltip
        id={`tooltip-${id}`}
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          color: "#222",
        }}
        className="shadow-lg"
        anchorSelect={`#marker-image-${id}`}
        clickable
      >
        <div className="flex flex-col gap-3 p-2 items-center">
          <p className="font-semibold">{name}</p>
          <button className="px-2 py-1 text-sm w-full" onClick={selectCallback}>
            Select
          </button>
        </div>
      </Tooltip>
    </div>
  );
}
