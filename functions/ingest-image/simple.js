import exifr from 'exifr';

const images = ['/Users/wbeebe/Downloads/_test-photos/DSC05662.jpg', '/Users/wbeebe/Downloads/_test-photos/DSC01507.jpg'];

for (let i = 0; i < images.length; i++) {
  const tags = [];
  exifr.parse(images[i], true)
    .then((output) => {
      const {
        CreateDate,
        DateTimeOriginal,
        ISO,
        FNumber,
        ExposureTime,
        ShutterSpeedValue,
        subject,
      } = output;

      console.log('output ', output);
      console.log('photo ', ISO, FNumber, ShutterSpeedValue / ExposureTime);
    });
}
