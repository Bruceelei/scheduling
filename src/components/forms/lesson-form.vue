<template>
  <div class="ui modal dimmable period-subcourse">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加课件</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <InputComponent
          label="标题"
          name="title"
          v-bind:isRequired="true"
          v-bind:value="title"
          v-on:input="title = $event"
        />
        <div class="field">
          <div class="inline fields">
            <FileComponent
            label="文件"
            name="file"
            v-bind:value="file_title"
            v-on:input="file_title = $event"
            @setSignId="setSignId"
            />
            <FileComponent
            label="媒体文件"
            name="media"
            v-bind:value="media_title"
            v-on:input="media_title = $event"
            @setSignId="setSignId"
            />
          </div>
        </div>
        <div class="ui error message"></div>
        <div class="action">
          <div class="ui submit button">确定</div>
        </div>
      </form>
      <div class="ui inverted dimmer" v-bind:class="{active: formLoading}">
        <div class="ui loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import InputComponent from "../form-components/input-component.vue";
import FileComponent from "../form-components/file-component.vue";
import notify from "../../api/notify";

export default {
  name: "LessonForm",
  components: {
    InputComponent,
    FileComponent,
  },
  computed:{
    title: {
      get() {
        return this.$store.state.lessonForm.title
      },
      set(value) {
        this.$store.commit('lessonForm/updateTitle',value);
      }
    },
    formLoading: function(){
      return this.$store.state.lessonForm.formLoading;
    },
    file_title: {
      get(){
        let fileTitle = this.$store.state.lessonForm.fileTitle;
        if(fileTitle != null && fileTitle.length > 20) {
          fileTitle = fileTitle.substr(0, 20)+"...";
        }

        return fileTitle;
      },
      set(value) {
        this.$store.commit('lessonForm/updateFileTitle',value);
      }
    },
    media_title: {
      get(){
        let mediaTitle = this.$store.state.lessonForm.mediaTitle;
        if(mediaTitle != null && mediaTitle.length > 20) {
          mediaTitle = mediaTitle.substr(0, 20)+"...";
        }

        return mediaTitle;
      },
      set(value) {
        this.$store.commit('lessonForm/updateMediaTitle',value);
      }
    },
  },
  methods: {
    setSignId: function (name, signId) {
      if(name == "file") {
        this.$store.commit('lessonForm/updateFileSignId',signId);
      } else if(name == "media") {
        this.$store.commit('lessonForm/updateMediaSignId',signId);
      }
    },
  },
  updated: function() {
    var component = this;
    $(".ui.modal.period-subcourse .ui.form").form({
      fields: {
        name: {
          identifier: "name",
          rules: [
            {
              type: "regExp[/^\\S{4,16}$/]",
              prompt: "标题不能为空，长度4-16位"
            }
          ]
        },
      },
      onSuccess: function(event, fields) {
        let itemData = [
          {
            key: "标题",
            value: component.$store.state.lessonForm.title
          },
          {
            key: "文件",
            value: component.$store.state.lessonForm.fileTitle,
            signId: component.$store.state.lessonForm.fileSignId
          },
          {
            key: "媒体资料",
            value: component.$store.state.lessonForm.mediaTitle,
            signId: component.$store.state.lessonForm.mediaSignId
          }
        ];
        component.$store.commit("courseForm/updateLessonItems",{index: component.$store.state.lessonForm.positionIndex, itemData: itemData});
        $(".ui.modal.period-subcourse").modal("hide");

        notify.show("添加成功");
        return false;
      }
    });
  }
}
</script>

<style scoped>
.ui.modal > .fa-times {
  width: 72px;
  height: 72px;
  top: 0;
  right: 0;
  padding: 25px;
  color: #9199a3;
}

.ui.modal > .content {
  background-color: unset;
}

::-webkit-scrollbar {
    display: none;
}

.ui.modal > .content > .ui.form {
  margin: auto;
  max-width: 420px;
}

.ui.form > .action {
  width: 100%;
  text-align: center;
}

.ui.form > .action > .ui.submit.button {
  color: white;
  background-color: #00cddd;
  box-shadow: 0px 2px 11px 0px rgba(0, 205, 221, 0.2);
  border-radius: 4px;
}

@media only screen and (min-width: 1920px) {
  .ui.modal:not(.fullscreen) {
    width: 620px;
    margin: 0;
  }
}

@media only screen and (min-width: 1200px) {
  .ui.modal:not(.fullscreen) {
    width: 570px;
    margin: 0;
  }
}
@media only screen and (min-width: 992px) {
  .ui.modal:not(.fullscreen) {
    width: 520px;
    margin: 0;
  }
}
@media only screen and (min-width: 768px) {
  .ui.modal:not(.fullscreen) {
    width: 35%;
    margin: 0;
  }
}

</style>
