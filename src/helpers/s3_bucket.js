import AWS from "aws-sdk";

AWS.config.update({ region: 'eu-west-2' });

const s3 = new AWS.S3();

const uploadImageOnS3 = async (image) => {
    try {
        const file = image;
        const extension = file.name.split('.').pop();
        const newImage = `${Date.now()}_${Math.floor(Math.random() * 100000)}.${extension}`;

        const params = {
            Bucket: 'development-q639jgd5-artifact-eu-west-2',
            Key: newImage,
            Body: file.data,
            ContentType: file.mimetype || 'image/jpeg',
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    console.error('S3 Upload Error:', err);
                    reject(err);
                } else {
                    console.log('Upload successful');
                    // resolve(data.Location);
                    resolve(newImage)
                }
            });
        });
    } catch (error) {
        console.error('uploadImageOnS3 Error:', error);
        throw error;
    }
};


// const uploadImageOnS3 = async (image, req) => {
//     try {
//         const extention = image.name.split('.').pop();
//         const todayDate = new Date();
//         const newImage = todayDate.getTime() + Math.floor(100000 + Math.random() * 900000) + '.' + extention;
//         const imageurl = `public/${newImage}`;
//         await image.mv(imageurl);
//         const url = `${req.protocol}://${req.get('host')}/${newImage}`;
//         return url;
//     } catch (error) {
//         console.log('error', error);
//     }
// }




export { uploadImageOnS3 };
