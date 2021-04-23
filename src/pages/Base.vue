<template>
  <q-layout view="hHh lpR fFf" class='full-height'>

    <q-drawer show-if-above side="left" elevated class="fixed-left gt-sm"  >
      <q-card-section class="flex-center flex column q-mt-xl">
        <q-item class="full-width">
          <q-tabs
            v-model="currentCollect"
            vertical
            class="text-dark full-width"
          >
            <q-tab
              class="full-width"
              v-for="collect in collections"
              :name="collect"
              :label="collect"
              :key="collect"
            />
          </q-tabs>
        </q-item>
      </q-card-section>
    </q-drawer>

    <q-page-container class="q-mb-sm">
      <div v-if="!loading && currentCollect">
      <q-form
        class="flex column content-center q-py-xl q-gutter-lg"
        @submit="addNewDoc({ currentCollect,formData })"
      >
        <q-input
          outlined
          v-for="(val, key) in formData"
          :key="key"
          :placeholder="key"
          v-model="formData[key]"
          :rules="[val => !!val || 'Field not be empty']"
          no-error-icon
        />
        <q-btn label="Add new Document" type="submit" />
      </q-form>
      </div>

      <q-spinner-cube
        class="absolute-center"
        size="5em"
        color="warning"
        v-if="loading"
      />
      <div
        v-if="!loading && currentCollect"
        class="row q-gutter-md justify-center "
      >
        <q-card class="my-card" v-for="doc in currentCollectData" :key="doc.id">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6" v-for="(d, key) in doc" :key="d.id">
              <span class="text-amber">{{ key }}:</span> {{ d }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="center">
            <q-btn flat @click="removeDoc({ doc, currentCollect })"
              >Remove</q-btn
            >
            <q-btn flat>Update</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div
        v-if="!loading && !currentCollectData && currentCollect"
        class="row justify-center q-mt-xl"
      >
        EMPTY
      </div>
    </q-page-container>

    <q-footer elevated class="bg-primary  text-white lt-sm">
      <q-card-section class="flex-center  flex row">
        <q-item>
          <q-tabs v-model="currentCollect" class="text-white flex">
            <q-tab
              v-for="collect in collections"
              :name="collect"
              :label="collect"
              :key="collect"
            />
          </q-tabs>
        </q-item>
      </q-card-section>
    </q-footer>

  </q-layout>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    data() {
      return {
        currentCollect: "",
        formData: {},
      };
    },
    watch: {
      async currentCollect() {
        await this.getDataBaseData(this.currentCollect);
      },
      currentCollectData() {
        if (this.currentCollectData) {
          Object.keys(this.currentCollectData).forEach((key) => {
            Object.keys(this.currentCollectData[key]).forEach((k) => {
              k !== "id" ? this.$set(this.formData, k, "") : null;
            });
          });
        }
      },
    },
    computed: {
      ...mapState("dataBase", ["collections", "currentCollectData", "loading"]),
    },
    methods: {
      ...mapActions("dataBase", ["getDataBaseData", "removeDoc", "addNewDoc"]),
    },
  };
</script>
