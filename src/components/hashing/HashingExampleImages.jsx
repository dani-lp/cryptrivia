import Image from "next/image";

export const HashingExampleImages = ({ index }) => {
  const images = {
    0: {
      src: "/img/hashing.png",
      alt: "",
      width: 700,
      height: 700,
    },
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Image
        src={images[index].src}
        alt={images[index].alt}
        width={images[index].width}
        height={images[index].height}
      />
    </div>
  );
};
