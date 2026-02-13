export class API {
  public static uploadImage = async (
    _file: File,
    _fileData: ArrayBuffer,
    _setPercent: (percent: number) => void,
  ) => {
    console.log("uploadImage", _file, _fileData, _setPercent);
    return Promise.resolve(
      "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
    );
  };
}

export default API;
