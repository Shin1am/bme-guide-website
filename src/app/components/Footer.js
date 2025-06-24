import Link from "next/link";


export default function Footer() {
    return (
        <div className="bg-[#2B395D] w-full h-[45vh] px-15 pt-10 flex flex-col overflow-hidden relative font-mono"> {/* Added 'flex flex-col' */}
            <div className="flex flex-row justify-between flex-grow"> {/* Added 'flex-grow' */}
                <div className="flex flex-col justify-between p-5">
                    <div className="flex flex-col justify-start items-start  text-white text-3xl ">
                        <p>Biomedical</p>
                        <p>Engineering</p>
                        <p>Guideline</p>
                    </div>
                    <h1 className="text-2xl text-white py-3">© 2025 All rights reserved</h1>
                </div>
                <div className="flex flex-row justify-start items-start gap-20 text-white text-xl pr-[10%] pt-2 uppercase">
                    <div className="flex flex-col gap-10">
                        <p className="font-semibold">Website</p>
                        <div className="flex flex-col justify-center items-start gap-3">
                            <Link href={'/'} className="hover:underline">Mahidol</Link>
                            <Link href={'/learning'} className="hover:underline">Engineer</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10">
                        <p className="font-semibold ml-10">Navigation</p>
                        <div className="flex flex-row gap-10">
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
                    <div className="flex flex-col gap-10">
                        <p className="font-semibold">Contact</p>
                        <div className="flex flex-col justify-center items-start gap-3">
                            <Link href={'/'} className="hover:underline">Phone</Link>
                            <a className="hover:underline" href="https://mail.google.com/mail/?view=cm&fs=1&to=maimmchanel@gmail.com" target="_blank">Email</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 right-0 w-[50%] flex justify-end pr-[10%]"> {/* Changed width and justify */}
                <p className="text-white text-6xl font-bold">CONTACT</p>
            </div>
      </div>
    )
}