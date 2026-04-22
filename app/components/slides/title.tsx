type Props = {
  title: string;
};

export function TitleSlide({ title }: Props) {
  return (
    <div className="flex flex-1 w-full h-full items-center justify-center">
      <h1 className="font-heading font-bold text-[9vh] leading-[1.2] uppercase max-w-[70vw] text-balance text-center">
        {title}
      </h1>
    </div>
  );
}
