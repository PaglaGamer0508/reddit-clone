"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  console.log(
    "This is my image src: " + src + "and it's type is: " + typeof src
  );

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}

export default CustomImageRenderer;
