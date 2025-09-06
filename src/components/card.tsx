import Image from "next/image";

interface CardProps {
  title: string;
  subtitle: string;
  img: string;
}

export default function Card({ title, subtitle, img }: CardProps) {
  return (
    <div
      className={`bg-[#1C1C1C0D] rounded-[12px] p-[20px] flex flex-col gap-[30px]`}
    >
      <div className="w-[78px] h-[78px] rounded-[12px] bg-[#ef976063] flex items-center justify-center">
        <Image src={img} alt="" />
      </div>
      <div className="flex flex-col gap-[25px]">
        <h1 className="font-medium text-[#1C1C1C] text-[24px]/[24px]">
          {title}
        </h1>
        <p className="text-[#595959] font-normal text-[16px]">{subtitle}</p>
      </div>
    </div>
  );
}
