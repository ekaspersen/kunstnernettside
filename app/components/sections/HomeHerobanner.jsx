// app/components/sections/HomeHerobanner.jsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeHerobanner = () => {
    return (
        <div className="bg-black">
            <div className="inner flex justify-center items-center py-16">
                <div className="flex-1 flex flex-col gap-8 z-10 bg-black text-center items-center py-4 max-w-fit">
                    <h1 className="text-6xl font-light sr-only">
                        Isabell Ramsvik
                    </h1>
                    <Image
                        src="/isabell_ramsvik-full_logo.png"
                        alt="Hero banner"
                        width={320}
                        height={400}
                        className="max-w-full"
                        objectFit="contain"
                    />
                    <div className="w-3/4 border-b-2 border-primary-light pt-8"></div>
                    <p className="max-w-xl font-light">
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
            </div>
        </div>
    );
};

export default HomeHerobanner;
