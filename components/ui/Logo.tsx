import Image from "next/image";

function Logo() {
  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-40 h-40">
        <Image src="/logo.svg" fill alt="Logotipo" />
      </div>
    </div>
  );
}
export default Logo;
