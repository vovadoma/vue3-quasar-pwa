<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          class='lt-sm'
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title shrink>
        Odexy PWA template
        </q-toolbar-title>
        <q-space/>
          <q-tabs class='gt-sm'>
            <q-route-tab to='/'>
              Home
            </q-route-tab>
            <q-route-tab to='/base'>
              Base
            </q-route-tab>
          </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if='leftDrawerOpen'
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Home',
    caption: '',
    link: '/'
  },
    {
    title: 'Base',
    caption: '',
    link: '/base'
  },
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
