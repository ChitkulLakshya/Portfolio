import Spline from "@splinetool/react-spline";

const SPLINE_SCENE_URL = "https://prod.spline.design/As-zA3oBQYhjxW8O/scene.splinecode";

type Props = {
  /** Tailwind classes for quick positioning tweaks */
  className?: string;
};

export default function SplineHero({ className = "" }: Props) {
  return (
    <div
      className={[
        "absolute inset-0 z-0 select-none",
        // Ensure Spline never captures scroll/click/touch
        "pointer-events-none [&_*]:pointer-events-none",
        "[&>canvas]:h-full [&>canvas]:w-full",
        className,
      ].join(" ")}
    >
      <Spline scene={SPLINE_SCENE_URL} className="h-full w-full" />
    </div>
  );
}

