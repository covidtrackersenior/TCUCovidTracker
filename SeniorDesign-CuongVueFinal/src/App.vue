<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        COVID-19 Tracker
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip left :dark="isDarkTheme">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="$refs.searchDialog.dialog = true">
            <v-icon>mdi-map-search</v-icon>
          </v-btn>
        </template>
        <span>Search</span>
      </v-tooltip>
      <v-tooltip left :dark="isDarkTheme">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="TOGGLE_THEME">
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>
        </template>
        <span>Switch theme</span>
      </v-tooltip>
    </v-app-bar>


    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav>
        <v-list-item-group v-model="group">
          <v-list-item>
            <v-list-item-title>Cases</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Vaccine Distribution</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Vaccination</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Active</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>New Daily Cases</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Unemployment</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <v-row>
          <v-col md="4" xs="12">
            <Card
              style="border-left: 4px solid green"
              title="Cases"
              :daily="0"
              :total="0"
              @change-case-type="setCasesType('Cases')"
            />
          </v-col>
          <v-col md="4" xs="12">
            <Card
              style="border-left: 4px solid blue"
              title="Recovered"
              :daily="0"
              :total="0"
              @change-case-type="setCasesType('Recovered')"
            />
          </v-col>
          <v-col md="4" xs="12">
            <Card
              style="border-left: 4px solid red"
              title="Deaths"
              :daily="0"
              :total="0"
              @change-case-type="setCasesType('Deaths')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="11" md="11">
            <v-card tile style="height: 80vh" flat>
              <LeafletMap :data="cases.data" ref="map" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <SearchDialog ref="searchDialog" :data="cases.data" />
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import LeafletMap from './components/Map.vue';
import SearchDialog from './components/SearchDialog.vue';
import Card from './components/Card.vue';
// import API from "../API";

export default {
  name: 'App',

  components: {
    LeafletMap,
    SearchDialog,
    Card
    // API
  },

  data: () => ({
    drawer: null,
    cases: {
      total_confirmed: 0,
      total_recovered: 0,
      total_death: 0,
      data: []
    },
    selected: {},
    dialog: false
  }),

  computed: {
    ...mapState(['isDarkTheme'])
  },

  async created() {
    this.$vuetify.theme.dark = this.isDarkTheme;
  },

  mounted() {},

  watch: {
    isDarkTheme(val) {
      this.$vuetify.theme.dark = val;
    }
  },

  methods: {
    ...mapMutations(['TOGGLE_THEME']),
    view(location) {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.drawer = false;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      const { Lat, Long } = location;
      this.$refs.map.flyTo(Lat, Long);
    }
  }
};
</script>
