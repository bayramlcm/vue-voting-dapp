<template>
  <v-toolbar flat color="white">
    <v-toolbar-title>Oylama Listesi</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-text-field
      append-icon="mdi-magnify"
      label="Ara"
      single-line
      hide-details
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn class="mb-2" v-on="on">
          Oylama Oluştur
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Oylama Oluştur</span>
        </v-card-title>

        <v-card-text>
          <v-container> İçerik </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text>İptal</v-btn>
          <v-btn color="blue darken-1" text>Kaydet</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
export default {};
</script>

<style>
</style>