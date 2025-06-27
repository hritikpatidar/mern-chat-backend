const upload_img = async (image, req) => {
    try {
        const extention = image.name.split('.').pop();
        const todayDate = new Date();
        const newImage = todayDate.getTime() + Math.floor(100000 + Math.random() * 900000) + '.' + extention;
        const imageurl = `public/${newImage}`;
        await image.mv(imageurl);
        const url = `${req.protocol}://${req.get('host')}/${newImage}`;
        // console.log('url', url)
        return url;
    } catch (error) {
        console.log('error', error);
    }
}


export default upload_img 