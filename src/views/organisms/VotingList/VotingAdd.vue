<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn class="mb-2" v-on="on"> Oylama Oluştur </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Oylama Durumunu Güncelle</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Oylama Konusu"
                  :rules="detailRules"
                  v-model="subject"
                  required
                ></v-text-field>
                <v-textarea
                  label="Oylama Konusunun Detayı"
                  required
                  v-model="detail"
                  auto-grow
                  rows="3"
                  :rules="detailRules"
                ></v-textarea>

                <v-menu
                  ref="menu"
                  v-model="dateDialog"
                  :close-on-content-click="false"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Bitiş Tarihi"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="dateRules"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" locale="tr-tr"> </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text>İptal</v-btn>
        <v-btn color="blue darken-1" text @click="save()">Oluştur</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialogOpen", "dialogClose", "item"],
  data: () => ({
    valid: true,
    subject: "",
    subjectRules: [(v) => !!v || "Oylama konusunu boş bırakmayın"],
    detail: "",
    detailRules: [(v) => !!v || "Oylama konusunun detayını boş bırakmayın"],
    date: new Date().toISOString().substr(0, 10),
    dateRules: [
      (v) => !!v || "Bitiş tarihini boş bırakmayın",
      (v) =>
        +new Date(v) > +new Date() || "Bitiş tarihi bugünden farklı olmalıdır",
    ],
    dateDialog: false,
    dialog: false,

    statusItems: [
      { status: "0", text: "Kapalı" },
      { status: "1", text: "Açık" },
      { status: "2", text: "Donduruldu" },
    ],
  }),
  computed: {},
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("votingCreate", {
            subject: this.subject,
            detail: this.detail,
            endDate: Math.floor(+new Date(this.date) / 1000),
          })
          .then(() => {
            this.dialog = false;
          });
      }
    },
  },
};
</script>

<style>
</style>