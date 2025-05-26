// app/components/sections/HomeHerobanner.jsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeHerobanner = () => {
    return (
        <div className="bg-black">
            <div className="inner flex justify-center items-center py-32">
                <div className="right-4 block absolute lg:hidden">
                    <Image
                        src="/heropicture.png"
                        alt="Hero banner"
                        width={400}
                        height={400}
                        objectFit="contain"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-8 z-10 bg-black-transparent py-4 max-w-fit mr-auto">
                    <h1 className="text-6xl font-light">Ramsvik Kunst</h1>
                    <p className="max-w-[554px]">
                        Hei jeg er Isabell Ramsvik, velkommen til nettsiden min!
                        Jeg lager kunst og ønsker deg velkommen til å se gjennom
                        mine prosjekter. Klikk på knappen under for å se mine
                        verk...
                    </p>
                    <Link href="/galleri">
                        <span className="btn-golden inline-block">
                            SE GALLERI
                        </span>
                    </Link>
                </div>
                <div className="pl-8 hidden lg:block">
                    <Image
                        src="/heropicture.png"
                        alt="Hero banner"
                        width={500}
                        height={500}
                        objectFit="contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeHerobanner;
