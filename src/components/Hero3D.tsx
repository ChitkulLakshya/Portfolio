import Spline from "@splinetool/react-spline";

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <Spline
        scene="https://prod.spline.design/As-zA3oBQYhjxW8O/scene.splinecode"
        className="w-full h-full pointer-events-auto"
      />
    </div>
  );
}
