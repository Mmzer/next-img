function nextImg(imgs, imgdone, alldone) {
    let resultDone = [];
    let resultError = [];

    // 辅助函数，获取数组里某个元素的索引
    function _indexOf(array, key) {
        if (Array.indexOf) return array.indexOf(key);
        if (array === null) return -1;
        for (let i = 0, length = array.length; i < length; i++) {
            if (array[i] === key) {
                return i;
            }
        }
        return -1;
    }

    function _remove(array, key) {
        let index = _indexOf(array, key);
        array.splice(index, 1);
    }

    function _loadImg(imgSrc, loaded, error) {
        let img = new Image();
        img.src = imgSrc;
        if (img.complete) {
            resultDone.push(img);
            loaded();
            imgdone(imgSrc);
        } else {
            img.onload = () => {
                resultDone.push(img);
                loaded();
                imgdone(imgSrc);
            };
            if (error) {
                img.error = () => {
                    resultError.push(img);
                    error();
                };
            }
        }
    }

    function load(items, iteration) {
        if (!iteration) iteration = 0;
        if (iteration >= items.length) {
            setTimeout(() => {
                alldone();
            }, 0);
            return;
        }
        if (items[iteration]) {
            _loadImg(
                items[iteration],
                () => {
                    load(items, iteration + 1);
                },
                () => {
                    _remove(items, items[iteration]);
                    load(items, iteration);
                }
            );
        }
    }

    load(imgs);

    return {
        resultDone,
        resultError
    };
}

module.exports = nextImg;
