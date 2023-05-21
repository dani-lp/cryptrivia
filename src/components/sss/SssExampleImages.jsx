import Image from "next/image";

export const SssExampleImages = ({ index }) => {
  const images = {
    0: {
      src: "/img/sss/sss_example_1.png",
      alt: "",
      width: 500,
      height: 500,
    },
    1: {
      src: "/img/sss/sss_example_2.png",
      alt: "",
      width: 500,
      height: 500,
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
