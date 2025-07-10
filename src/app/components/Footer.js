import Link from "next/link";


export default function Footer() {
    return (
        <div className="bg-[#2B395D] w-full h-full lg:h-[45vh] px-15 pt-10 flex flex-col overflow-hidden relative font-mono"> {/* Added 'flex flex-col' */}
            <div className="flex flex-col lg:flex-row justify-between flex-grow"> {/* Added 'flex-grow' */}
                <div className="hidden lg:flex flex-col justify-between p-5">
                    <div className="flex flex-col justify-start items-start text-white lg:text-xl xl:text-3xl">
                        <p>Biomedical</p>
                        <p>Engineering</p>
                        <p>Guideline</p>
                    </div>
                    <h1 className="flex lg:text-lg xl:text-2xl text-white py-3">© 2025 All rights reserved</h1>
                </div>
                <div className="flex flex-col justify-center gap-10 md:flex-row md:justify-center lg:justify-start items-start md:items-center lg:items-start md:gap-20 text-white text-xl lg:pr-[10%] pt-2 uppercase">
                    <div className="flex flex-col gap-5 md:gap-10">
                        <p className="font-semibold underline md:no-underline">Website</p>
                        <div className="text-base md:text-xl flex flex-col justify-center items-start gap-3">
                            <Link href={'/'} className="hover:underline">Mahidol</Link>
                            <Link href={'/learning'} className="hover:underline">Engineer</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 md:gap-10">
                        <p className="font-semibold underline md:no-underline md:ml-10 md:mt-10 lg:mt-0">Navigation</p>
                        <div className="text-base md:text-xl flex flex-col gap-3 md:flex-row md:gap-10">
                            <div className="flex flex-col justify-center items-start gap-3">
                                <Link href={'/'} className="hover:underline">Home</Link>
                                <Link href={'/learning'} className="hover:underline">Learning</Link>
                                <Link href={'/map'} className="hover:underline">Map</Link>
                            </div>
                            <div className="flex flex-col justify-center items-start gap-3">
                                <Link href={'/lab'} className="hover:underline">Lab</Link>
                                <Link href={'/lab'} className="hover:underline">More</Link>
                                <Link href={'/lab'} className="hover:underline">About Us</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 md:gap-10">
                        <p className="font-semibold underline md:no-underline ">Contact</p>
                        <div className="text-base md:text-xl flex flex-col justify-center items-start gap-3">
                            <Link href={'/'} className="hover:underline">Phone</Link>
                            <a className="hover:underline" href="https://mail.google.com/mail/?view=cm&fs=1&to=maimmchanel@gmail.com" target="_blank">Email</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden absolute bottom-10 right-0 w-[50%] lg:flex justify-end pr-[10%]"> {/* Changed width and justify */}
                <p className="text-white lg:text-4xl xl:text-6xl font-bold">CONTACT</p>
            </div>
            <div className="flex lg:hidden flex-col justify-center items-center py-20">
                <div className="flex flex-col justify-center items-center text-center text-white text-2xl">
                    <p>Biomedical Engineering Guideline</p>

                </div>
                <h1 className="flex text-base text-white mt-10">© 2025 All rights reserved</h1>
            </div>
      </div>
    )
}