import './DataAugmentation.css';

export function DataAugmentation() {
  return (
    <div className="augment-data">
      <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet"/>

      <h1> Data Augmentation </h1>
      <div className="upload-download">
        <div className="upload">
          <button className="btn">
            <i className="bx bx-upload" style={{ fontSize: '22px' }}></i>
            Upload 
          </button>
          <label className="upload-download-label">
            data.zip
          </label>
        </div>

        <div className="download">
          <button className="btn">
            <i className="bx bx-download" style={{ fontSize: '22px' }}></i>
            Download 
          </button>
          <label className="upload-download-label">
            augmented_data.zip
          </label>
        </div>
      </div>

      <div>
        <input type="text" className="text-prompt" placeholder="Number of images to generate" />
        <button className="block-button-small augment">
          AUGMENT
        </button>
      </div>
    </div>
  );
}