export default function AboutUs() {
    return (
        <div className="max-h-screen px-30 py-20">
            <div className="flex flex-row gap-30 h-screen">
                <div className="">
                    <h1 className="text-[200px] uppercase">About Us</h1>
                </div>
                <div className="flex flex-col gap-10">
                    <div className="mt-20">
                        <p className="text-4xl text-justify">
                            We aim to help Your journey to becoming a better Biomedical Engineer.
                            We are A DEVELOPER AND UX/UI DESIGNER BASED IN MAHIDOL UNIVERSITY. 
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-3xl">Contact</p>
                        <div className="flex flex-col text-2xl font-semibold">
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=maimmchanel@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Maimmchanel@gmail.com</a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pannawat.tho@student.mahidol.edu" target='_blank' rel="noopener noreferrer" className="hover:underline">pannawat.tho@student.mahidol.edu</a>
                        </div>
                    </div>
                    <p className="text-3xl">Supporting Us</p>
                    <div className="flex rounded-2xl border-2 h-[20vh] justify-center items-center">
                        <p className="text-4xl">BLAZE PICTURE</p>
                    </div>
                </div>
            </div>
        </div>
    )
}