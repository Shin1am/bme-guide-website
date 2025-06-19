import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <div className="bg-[#2B395D] w-full h-[35vh] px-15 pt-10 flex flex-col overflow-hidden"> {/* Added 'flex flex-col' */}
            <div className="flex flex-row justify-between flex-grow"> {/* Added 'flex-grow' */}
                <div className="flex flex-col ">
                    <div className="flex flex-row justify-start items-center ml-5">
                        <Image src={'/logo.png'} alt={'logo'} width={100} height={100} style={{filter: 'invert()',scale: '1.4'}} />
                        <span className="text-[35px] w-[25vw] text-white ml-10 font-medodica">Biomedical Engineering Guideline</span>
                    </div>
                    <h1 className="relative text-white text-[140px] uppercase font-mono mt-8">contact</h1>
                </div>
                <div className="flex flex-row justify-start items-start gap-20 text-white text-2xl pr-[10%] pt-2">
                    <div className="flex flex-col justify-center items-start gap-5">
                        <Link href={'/'}>Home</Link>
                        <Link href={'/learning'}>Learning</Link>
                        <Link href={'/map'}>Map</Link>
                        <Link href={'/lab'}>Lab</Link>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-5">
                        <Link href={'/more'}>More</Link>
                        <Link href={'/about-us'}>About Us</Link>
                        <Link href={'https://www.instagram.com/486jun_/'}>Home</Link>
                        <Link href={'google.com'}>Email</Link>
                    </div>
                </div>
            </div>
      </div>
    )
}