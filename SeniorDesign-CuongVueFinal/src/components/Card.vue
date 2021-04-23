<template>
  <v-card class="mx-auto">
    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>
      <div class="my-4 d-flex">
        <v-badge color="transparent">
          <template v-slot:badge>
            <v-icon small class="deep-purple--text darken-4">fa-virus</v-icon>
          </template>
          <h2>Daily: {{ daily }}</h2>
        </v-badge>
      </div>

      <div class="mt-6 d-flex">
        <v-badge color="transparent">
          <template v-slot:badge>
            <v-icon small class="red--text darken-4">fa-viruses</v-icon>
          </template>
          <h2>Total: {{ total }}</h2>
        </v-badge>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="$emit('change-case-type')"
      >
        See Detail
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: true
    },
    daily: {
      type: String,
      required: true
    },
    total: {
      type: String,
      required: true
    }
  }
};
</script>
