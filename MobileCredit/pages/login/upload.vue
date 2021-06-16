<template>
  <div class="box">
    <div class="upDiv">
      <ul class="upload-list">
        <li
          class="upload-list-item"
          v-for="(item, index) in ImageList"
          :key="index"
          :class="{ loading: index == ImageList.length - 1 && loading }"
        >
          <img :src="item.imagePath" alt="" />
        </li>
      </ul>
      <div
        class="inputBox"
        @click="loading === false ? onUploadClick() : tipLoading()"
      >
        <input
          ref="uploadInput"
          type="file"
          class="upinp"
          name="file"
          value=""
          accept="image/gif,image/jpeg,image/jpg,image/png"
          @change="selectImg($event)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    originImg: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      ImageList: [],
      useMock: true, // 真正用的使用这个 改为 false  或者删掉useMock判断为true的代码,  base64:这个变量可以删掉
      loading: false,
      base64:
        "data:image/png;base64,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",
    };
  },
  mounted() {
    this.ImageList = [];
    this.getImage();
    console.log(this.labTex);
  },
  // input的change回调第一个参数是event对象
  methods: {
    getImage() {
      var _this = this;
      // 发送请求
      let xhr = new XMLHttpRequest();
      xhr.open("post", "http://localhost:8888/web/selectAllImg");
      xhr.send();
      xhr.onload = function () {
        // 获取服务器端返回的数据并转为json对象格式的数据
        var res = JSON.parse(xhr.responseText);
        if (_this.useMock) {
          res = [
            {
              imagePath: _this.base64,
            },
          ];
        }
        _this.ImageList = _this.ImageList.concat(res);
      };
    },
    onUploadClick() {
      this.$refs.uploadInput.click();
    },
    selectImg(e) {
      var _this = this;
      this.loading = true;
      const imgFile = e.target.files[0];
      console.log(imgFile, e);
      if (imgFile === undefined) {
        this.loading = false;
        return;
      } else {
        // 1 创建文件读取对象
        let reader = new FileReader();
        // 2 读取文件
        reader.readAsDataURL(imgFile);
        // 3 监听onload事件
        reader.onload = function () {
          var item = {
            imagePath: reader.result,
          };
          _this.ImageList.push(item);
        };

        // 创建一个空的FormDate表单对象
        let formDate = new FormData();
        // 文件域控件下有一个files属性，可以获取到文件的目录，是一个类对象
        // console.log(this.files[0]);
        // 把用户上传的数据追加到formDate对象中
        formDate.append("file", imgFile);
        // 发送请求
        let xhr = new XMLHttpRequest();
        xhr.open("post", "http://localhost:8888/web/importImg");
        xhr.send(formDate);
        xhr.onload = function () {
          // 获取服务器端返回的数据并转为json对象格式的数据
          var res = JSON.parse(xhr.responseText);
          console.log("上传成功");
          if (_this.useMock) {
            res = {
              imagePath: reader.result,
            };
          }
          var index = _this.ImageList.length - 1;
          _this.ImageList[index].imagePath = res.imagePath;
          _this.loading = false;
        };
      }
    },
    tipLoading() {
      alert("图片正在上传中");
    },
  },
};
</script>
<style>
.upDiv .upinp {
  display: none;
}
.upDiv .inputBox {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
  display: inline-block;
  text-align: center;
  outline: none;
  background-image: url("add.png");
  background-repeat: no-repeat;
  background-position: center;
}
.upload-list {
  margin: 0;
  display: inline;
  vertical-align: top;
}
.upload-list .upload-list-item {
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  margin: 0 8px 8px 0;
  display: inline-block;
}
.upload-list-item > img {
  width: 100%;
  height: 100%;
}
.upload-list-item.loading {
  position: relative;
}
.upload-list-item.loading:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
}
</style>