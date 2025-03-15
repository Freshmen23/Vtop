import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

function Block_page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    
    const [imageBase64, setImageBase64] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageBase64(reader.result);
            };
        }
    };

    const onSubmit = (data) => {
        console.log(data);
        navigate("/Hostel_page", {state:{...data, image: imageBase64} });
    };

    return (
        <div >
            <form className="flex flex-col text-center justify-center" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="regNo">Registration Number</label>
                <input className="flex self-center px-2 py-1 border-black border-2 m-2"
                    {...register('regNo', { required: true, minLength: 3 })} />
                {errors.regNo && <p>Please enter your Registration No.</p>}

                <label>Choose Block</label>
                <select className="flex self-center px-2 py-1 border-black border-2 m-2"  {...register("Block")}>
                    <option value="MENS HOSTEL BLOCK-2 (BOYS HOSTEL - Block )">MENS HOSTEL BLOCK-2 (BOYS HOSTEL - Block )</option>
                    <option value="Large Dining-2 (Boys Hostel - Block)">Large Dining-2 (Boys Hostel - Block)</option>
                </select>

                <label htmlFor="roomNo">Room No</label>
                <input className="flex self-center px-2 py-1 border-black border-2 m-2"
                    {...register('roomNo', { required: true, minLength: 3, pattern: /\d+/ })} />
                {errors.roomNo && <p>Please enter your Room No.</p>}

                <label htmlFor="image">Upload Image</label>
                <input className="flex self-center px-2 py-1 border-black border-2 m-2 " 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} />
                
                <p className="text-center text-gray-400"> please choose a file to make it look accurate </p>

                <input className="bg-green-700 flex self-center my-2 px-[14px] py-[8px] rounded-[12px]" type="submit" />

            </form>
        </div>
    );
}

export default Block_page;
