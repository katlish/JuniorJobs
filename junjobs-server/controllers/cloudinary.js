const { cloudinary } = require('../utils/cloudinary');

exports.get = async (req, res, next) => {
	const { resources } = await cloudinary.search
        .expression('folder:samples')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    // const publicIds = resources.map((file) => file.public_id);
    // res.send(publicIds);
    const urls = resources.map((file) => file.url);
    res.send(urls);
};

exports.upload = async (req, res, next) => {
	try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr);
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
};
