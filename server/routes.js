module.exports = function (app) {
    const axios = app.get('axios');
    const flickrUrl = app.get('flickrUrl');

    app.get('/api/images', async (req, res, next) => {
        let time = new Date();

        let status, success, photos = undefined;
        let err = null;

        try {
            let response = await axios.get(flickrUrl + req.query.string);

            status = response.status;
            success = true;
            photos = response.data.photos.photo;
        } catch (responseErr) {
            success = false;
            err = responseErr;
        } finally {
            req.data = {
                status,
                success,
                err,
                photos,
                time: (new Date()) - time
            };
            next();
        }
    })
}