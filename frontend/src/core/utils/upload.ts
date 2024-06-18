export const uploadImage = async (image: any) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'chatpresetimages');
    try {
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dkpaiyjv5/image/upload',
            {
                method: 'post',
                body: data,
            }
        );
        const urlData = await res.json();
        return urlData.secure_url;
    } catch (error) {
        console.log(error);
    }
};
