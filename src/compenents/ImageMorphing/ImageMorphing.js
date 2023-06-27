import './ImageMorphing.css';

export function ImageMorphing() {
  return (
    <div className="morph-image">
      <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet"/>

      <h1> Image Morphing </h1>
      <div className="input-images">
        <div>
          <h2> Original </h2>
          <img className="image"
            src="https://fastly.picsum.photos/id/3/1024/768.jpg?hmac=2sPBRwLQLIkqj6SEgd78RBwP-yLUnpwsUEmosuIdsX0"
            alt="..." />
        </div>
        <div className="original-upload">
          <button className="btn">
            <i className="bx bx-upload" style={{ fontSize: '22px' }}></i>
            Upload 
          </button>
          <label className="image-label">
            original.jpg
          </label>
        </div>

        <div>
          <h2> Target </h2>
          <img className="image"
            src="https://fastly.picsum.photos/id/596/1024/768.jpg?hmac=q9PXDEOrLj3oAS3xpSFnYzN__ZQa_RxqouJ0G-sHQ8A"
            alt="..." />
        </div> 
        <div className="target-upload">
          <button className="btn">
            <i className="bx bx-upload" style={{ fontSize: '22px' }}></i>
            Upload 
          </button>
          <label className="image-label">
            target.jpg
          </label>
        </div>

        <button className="block-button-small morph">
          <i className="bx bx-play" style={{ fontSize: '20px' }}></i>
          MORPH
        </button>
      </div>
     
      <div className="transistions">
        <h2> Transistions </h2>
        <div className="images">
          <img className="image"
            src="https://fastly.picsum.photos/id/596/1024/768.jpg?hmac=q9PXDEOrLj3oAS3xpSFnYzN__ZQa_RxqouJ0G-sHQ8A"
            alt="..." />
          <img className="image"
            src="https://fastly.picsum.photos/id/596/1024/768.jpg?hmac=q9PXDEOrLj3oAS3xpSFnYzN__ZQa_RxqouJ0G-sHQ8A"
            alt="..." />
          <img className="image"
            src="https://fastly.picsum.photos/id/596/1024/768.jpg?hmac=q9PXDEOrLj3oAS3xpSFnYzN__ZQa_RxqouJ0G-sHQ8A"
            alt="..." />
          <img className="image"
            src="https://fastly.picsum.photos/id/596/1024/768.jpg?hmac=q9PXDEOrLj3oAS3xpSFnYzN__ZQa_RxqouJ0G-sHQ8A"
            alt="..." />
          <img className="image"
            src="https://fastly.picsum.photos/id/596/1024/768.jpg?hmac=q9PXDEOrLj3oAS3xpSFnYzN__ZQa_RxqouJ0G-sHQ8A"
            alt="..." />
          <img className="image"
            src="https://fastly.picsum.photos/id/596/1024/768.jpg?hmac=q9PXDEOrLj3oAS3xpSFnYzN__ZQa_RxqouJ0G-sHQ8A"
            alt="..." />
          <img className="image"
            src="https://fastly.picsum.photos/id/596/1024/768.jpg?hmac=q9PXDEOrLj3oAS3xpSFnYzN__ZQa_RxqouJ0G-sHQ8A"
            alt="..." />
        </div>
      </div>
      
    </div>
  );
}