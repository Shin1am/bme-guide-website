import Image from "next/image"

export default function AboutUs() {
    return (
        <div className="max-h-screen p-10 md:p-20 lg:px-30 lg:py-20">
            <div className="flex flex-col lg:flex-row lg:gap-30 h-screen">
                <div className="flex flex-col justify-center items-center md:justify-start">
                    <h1 className="text-[80px] md:text-[140px] lg:text-[200px] uppercase">About 
                        <span className="hidden md:inline-block text-[#4D639B]"> Us 
                            <span className="hidden lg:block lg:relative bottom-65 left-60">
                                <Image 
                                    src={'/glasses.png'}
                                    alt="glasses"
                                    width={400}
                                    height={100}
                                    className="object-contain"
                                />
                            </span>
                        </span>
                    </h1>
                    <h1 className="text-[80px] text-[#4D639B] uppercase md:hidden">Us</h1>
                </div>
                <div className="flex flex-col gap-10">
                    <div className="mt-10 lg:mt-20">
                        <p className="text-xl md:text-3xl lg:text-4xl text-center lg:text-justify">
                            We aim to help Your journey to becoming a better Biomedical Engineer.
                            We are A developer and UX/UI designer based in Mahidol University. 
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-xl md:text-3xl underline underline-offset-4 md:no-underline">Contact</p>
                        <div className="flex flex-col text-lg md:text-2xl font-semibold">
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=maimmchanel@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Maimmchanel@gmail.com</a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pannawat.tho@student.mahidol.edu" target='_blank' rel="noopener noreferrer" className="hover:underline">pannawat.tho@student.mahidol.edu</a>
                        </div>
                    </div>
                    <p className="underline underline-offset-4 text-xl md:text-3xl">Supporting Us</p>
                    <div className="flex rounded-2xl border-2 h-full md:h-[20vh] justify-center items-center">
                        <p className="text-xl md:text-4xl">Test</p>
                    </div>
                </div>
            </div>
        </div>
    )
}