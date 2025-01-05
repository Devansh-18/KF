// SimpleParallax.js
import React from 'react';

const SimpleParallax = () => {
    return (
            <div
                className="h-full text-white w-[70%] rounded-2xl bg-fixed bg-center bg-cover"
                style={{ backgroundImage: 'url("/src/assets/skyMountain2.avif")' }} // Replace with your image URL
            >
                <div className="flex flex-col gap-8 items-center justify-center rounded-2xl h-full p-4 bg-black bg-opacity-50">
                    <h1 className="text-white text-5xl font-bold">Khushi Fragrances</h1>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quidem. Quam reprehenderit nemo corporis nihil ut modi earum eligendi aliquam!
                    </div>
                </div>
            </div>
    );
};

export default SimpleParallax;
