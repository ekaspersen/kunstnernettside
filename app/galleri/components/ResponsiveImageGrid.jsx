// app/galleri/components/ResponsiveImageGrid.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import imagesData from "../../api/gallery/data/images.json";

export const ResponsiveImageGrid = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage, setImagesPerPage] = useState(6);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const galleryImages = imagesData.images.filter(
                (img) => img.displayInGallery
            );
            setImages(galleryImages);
        } catch (err) {
            console.error("Failed to process images:", err);
            setError("Kunne ikke laste bilder.");
        }
    }, []);

    useEffect(() => {
        const updateImagesPerPage = () => {
            const width = window.innerWidth;
            if (width < 480) {
                setImagesPerPage(3); // 3 rows × 1 col
            } else if (width < 640) {
                setImagesPerPage(6); // 3 rows × 2 cols
            } else {
                setImagesPerPage(6); // 2 rows × 3 cols
            }
        };
        updateImagesPerPage();
        window.addEventListener("resize", updateImagesPerPage);
        return () => window.removeEventListener("resize", updateImagesPerPage);
    }, []);

    if (error) {
        return (
            <div className="text-primary-light text-center p-4">
                <p>{error}</p>
            </div>
        );
    }

    const totalPages = Math.ceil(images.length / imagesPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [imagesPerPage, totalPages]);

    const startIndex = (currentPage - 1) * imagesPerPage;
    const visibleImages = images.slice(startIndex, startIndex + imagesPerPage);

    const goToPage = (pageNum) => setCurrentPage(pageNum);

    const renderPageButtons = () => {
        const buttons = [];
        buttons.push(
            <button
                key="1"
                onClick={() => goToPage(1)}
                className={currentPage === 1 ? "font-bold underline" : ""}
            >
                1
            </button>
        );
        if (currentPage >= 4) buttons.push(<span key="dots-left">...</span>);
        if (currentPage > 1 && currentPage < totalPages) {
            buttons.push(
                <button
                    key={currentPage}
                    onClick={() => goToPage(currentPage)}
                    className="font-bold underline"
                >
                    {currentPage}
                </button>
            );
            if (currentPage < totalPages - 1)
                buttons.push(<span key="dots-right">...</span>);
        }
        if (totalPages > 1) {
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => goToPage(totalPages)}
                    className={
                        currentPage === totalPages ? "font-bold underline" : ""
                    }
                >
                    {totalPages}
                </button>
            );
        }
        return buttons;
    };

    return (
        <>
            {/* Mobile Pagination */}
            <div className="flex justify-between items-center sm:hidden mb-4">
                <button
                    className="btn-inverted"
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    Forrige
                </button>
                <div className="flex gap-2 text-primary-light">
                    {renderPageButtons()}
                </div>
                <button
                    className="btn-golden"
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    Neste
                </button>
            </div>

            {/* Grid with Overlay */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 w-full p-2 bg-primary-light">
                {images.length > 0 ? (
                    visibleImages.map((image) => (
                        <div
                            key={image.id}
                            className="w-full aspect-square relative group"
                        >
                            <Image
                                src={image.url}
                                alt={image.title || "Bilde"}
                                className="object-cover w-full h-full"
                                fill
                                sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, 33vw"
                                onError={(e) => {
                                    console.error(
                                        `Failed to load image: ${image.url}`
                                    );
                                    e.target.src = "/images/fallback.jpg";
                                }}
                            />
                            <Link href={`/galleri/images/${image.id}`}>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="btn-golden">
                                        Se mer
                                    </button>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center text-primary-light">
                        Ingen bilder tilgjengelig
                    </div>
                )}
            </div>

            {/* Desktop Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="btn-inverted"
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    Forrige
                </button>
                <div className="flex gap-2 text-primary-light">
                    {renderPageButtons()}
                </div>
                <button
                    className="btn-golden"
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    Neste
                </button>
            </div>
        </>
    );
};
