import React, { useState } from 'react';

const PngToJpgConverter = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [convertedImage, setConvertedImage] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const convertToJpg = () => {
        if (!selectedFile) {
        alert('파일을 선택해주세요.');
        return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
            setConvertedImage(blob);
            }, 'image/jpeg', 0.95);
        };
        img.src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
    };

    const downloadJpg = () => {
        if (!convertedImage) {
        alert('먼저 이미지를 변환해주세요.');
        return;
        }

        const link = document.createElement('a');
        link.href = URL.createObjectURL(convertedImage);
        link.download = 'converted_image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">PNG to JPG 변환기</h2>
        <input
            type="file"
            accept=".png"
            onChange={handleFileChange}
            className="mb-4 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <button
            onClick={convertToJpg}
            className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            PNG를 JPG로 변환
        </button>
        <button
            onClick={downloadJpg}
            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={!convertedImage}
        >
            JPG 다운로드
        </button>
        </div>
    );
};

export default PngToJpgConverter;