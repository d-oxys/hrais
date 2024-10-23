import Image from "next/image";

const LoadingComponent = () => {
  return (
    <div className="flex h-screen justify-center">
      <div className="m-auto text-center justify-center">
        <Image
          src="/assets/images/loading-animation.gif"
          width={100}
          height={50}
          alt="Loading"
        />
        <div className="w-full">Loading...</div>
      </div>
    </div>
  );
};
export default LoadingComponent;
