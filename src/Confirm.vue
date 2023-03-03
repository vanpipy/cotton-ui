<template>
  <div class="cotton-confirm cotton-confirm--mask" :class="{ 'cotton-confirm--visible': visible }">
    <div class="cotton-confirm__container">
      <div class="cotton-confirm__title">
        {{ title }}
      </div>
      <div class="cotton-confirm__content">
        {{ content }}
      </div>
      <div class="cotton-confirm__operate">
        <LoadableButton :on-click="onClickCancel" class="cotton-confirm__cancel-button">
          {{ cancelButtonText }}
        </LoadableButton>
        <LoadableButton type="primary" class="cotton-confirm__confirm-button" :on-click="onClickConfirm">
          {{ confirmButtonText }}
        </LoadableButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoadableButton from './LoadableButton.vue';

@Component({
  components: {
    LoadableButton,
  },
})
export default class CottonConfirm extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly content!: string;
  @Prop({ default: '确定' }) readonly confirmButtonText!: string;
  @Prop({ default: '取消' }) readonly cancelButtonText!: string;
  @Prop() readonly onConfirm!: () => Promise<void> | void;
  @Prop() readonly onCancel!: () => Promise<void> | void;

  visible = false;

  data() {
    return {
      visible: false,
    };
  }

  public async onClickConfirm() {
    try {
      await this.onConfirm();
      this.hide();
    } catch (err) {
      console.error(err);
    }
  }

  public async onClickCancel() {
    try {
      await this.onCancel();
      this.hide();
    } catch (err) {
      console.error(err);
    }
  }

  public show() {
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }
}
</script>

<style>
.cotton-confirm {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
}

.cotton-confirm--mask {
  background-color: transparent;
}

.cotton-confirm--visible {
  display: block;
}

.cotton-confirm__container {
  margin: 15vh auto 0;
  width: 30%;
  padding: 20px;
  background: white;
  border: 1px solid #eee;
  box-shadow: 0px 0px 10px #eee;
}

.cotton-confirm__title {
  font-size: 24px;
  margin-bottom: 15px;
}

.cotton-confirm__operate {
  margin-top: 40px;
  text-align: center;
}
</style>
