<template lang="">
    <blankVue>
        <template v-slot:title>
            <title>Meja | Point Of Sales</title>
        </template>

        <template v-slot:breadcrumbs>
            <ul>
                <li><a>Master</a></li>
                <li><a>meja</a></li>
                <li></li>
            </ul>
        </template>

        <template v-slot:alert>
            <div v-if="errors" class="toast toast-start">
                <div v-if="this.alert_success" class="alert alert-success shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{{ this.alert_success }}</span>
                    </div>
                </div>
                <div v-if="this.alert_warning" class="alert alert-warning shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{{ this.alert_warning }}</span>
                    </div>
                </div>
                <div v-if="this.alert_danger" class="alert alert-error shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{{ this.alert_danger }}</span>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:opsibutton>
            <div class="flex justify-end">
                <a href="#modal-tambah">
                    <div
                        class="flex justify-center items-center modal-button w-24 bg-green-500 hover:bg-green-400 capitalize h-8 rounded-lg">
                        <i class="fa-solid fa-plus pr-2"></i>tambah
                    </div>
                </a>
            </div>
        </template>
        <template v-slot:modals>
            <div class="modal" id="modal-tambah">
                <div class="modal-box">
                    <h2 class="font-bold text-lg">Tambah Meja</h2>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Nama</span>
                        </label>
                        <input v-model="formtambah.nama" type="text" placeholder="Nama..."
                            class="input input-bordered" />
                        <span class="label-text text-red-500" v-if="errors.nama">{{ errors.nama }}</span>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Status</span>
                        </label>
                        <select v-model="formtambah.status" class="select select-bordered w-full">
                            <option value="1" class="capitalize">aktif</option>
                            <option selected value="0" class="capitalize">
                                tidak aktif
                            </option>
                        </select>
                        <span class="label-text text-red-500" v-if="errors.status">{{ errors.status }}</span>
                    </div>
                    <div class="modal-action">
                        <button v-if="formtambah.processing"
                            class="btn border-0 btn-square bg-green-500 loading"></button>
                        <button v-else class="btn bg-green-500 hover:bg-green-400 text-white border-0"
                            @click="submittambah">
                            Save
                        </button>
                        <a href="#" class="btn">Exit</a>
                    </div>
                </div>
            </div>
            <div class="modal" id="modal-edit">
                <div class="modal-box">
                    <h2 class="font-bold text-lg">Edit Meja</h2>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Nama</span>
                        </label>
                        <input v-model="formedit.nama" readonly disabled type="text" placeholder="Nama..."
                            class="input input-bordered" />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Status</span>
                        </label>
                        <select v-model="formedit.status" class="select select-bordered w-full">
                            <option value="1" class="capitalize">aktif</option>
                            <option selected value="0" class="capitalize">
                                tidak aktif
                            </option>
                        </select>
                    </div>
                    <div class="modal-action">
                        <button v-if="formedit.processing"
                            class="btn border-0 btn-square bg-green-500 loading"></button>
                        <button v-else class="btn bg-green-500 hover:bg-green-400 text-white border-0"
                            @click="submitedit">
                            Save
                        </button>
                        <a href="#" class="btn">Exit</a>
                    </div>
                </div>
            </div>
            <div class="modal" id="modal-hapus">
                <div class="modal-box">
                    <h2 class="font-bold text-lg">
                        Konfirmasi penghapusan {{ formhapus.nama }}
                    </h2>
                    <div class="modal-action">
                        <button v-if="formhapus.processing" class="btn border-0 btn-square bg-red-500 loading"></button>
                        <button v-else class="btn bg-red-500 hover:bg-red-400 text-white border-0" @click="submithapus">
                            Delete
                        </button>
                        <a href="#" class="btn">Exit</a>
                    </div>
                </div>
            </div>
            <a href="#" id="submit"></a>
        </template>

        <template v-slot:konten>
            <div class="form-control mb-2 flex flex-row ">
                <div class="input-group">
                    <input type="text" v-model="search.value" placeholder="Search…" class="input input-bordered" />
                    <button class="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                <div class="justify-end ">
                    <button :disabled="formbarcode.id == null" @click="submitbarcode"
                        class="btn bg-blue-400 border-0 hover:bg-blue-300 w-max text-white flex flex-row gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="text-white h-4 w-4">
                            <path
                                d="M384 32H64.01C28.66 32 .0085 60.65 .0065 96L0 415.1C-.002 451.3 28.65 480 64 480h232.1c25.46 0 49.88-10.12 67.89-28.12l55.88-55.89C437.9 377.1 448 353.6 448 328.1V96C448 60.8 419.2 32 384 32zM52.69 427.3C50.94 425.6 48 421.8 48 416l.0195-319.1C48.02 87.18 55.2 80 64.02 80H384c8.674 0 16 7.328 16 16v192h-88C281.1 288 256 313.1 256 344v88H64C58.23 432 54.44 429.1 52.69 427.3zM330.1 417.9C322.9 425.1 313.8 429.6 304 431.2V344c0-4.406 3.594-8 8-8h87.23c-1.617 9.812-6.115 18.88-13.29 26.05L330.1 417.9z" />
                        </svg>
                        cetak barcode
                    </button>
                </div>
            </div>
            <div class="w-full overflow-auto scrollbar-hide grid grid-cols-5 gap-3 p-5">
                <div class="h-36 w-56 border rounded-lg overflow-hidden shadow-lg hover:scale-105 transition ease-out"
                    v-for="(data, index) in filteredItems" :key="index">
                    <div class="z-10 absolute p-1">
                        <input type="checkbox" @click="barcode_data" name="barcode" :value="data.id" class="checkbox">
                    </div>
                    <div class="bg-red-300 z-0 w-full h-full flex gap-4 items-center justify-center flex-col"
                        v-if="data.status == 1">
                        <article class="prose">
                            <h3>{{ data.nama }}</h3>
                        </article>
                        <div class="grid grid-cols-2 text-white">
                            <a href="#modal-edit">
                                <label @click="edit(data.id)"
                                    class="flex justify-center items-center modal-button w-24 bg-blue-500 hover:bg-blue-400 capitalize h-8 rounded-lg mr-2">
                                    <i class="fa-solid fa-pen-to-square pr-2"></i>edit
                                </label>
                            </a>
                            <a href="#modal-hapus">
                                <label @click="hapus(data.id)"
                                    class="flex justify-center items-center modal-button w-24 bg-red-500 hover:bg-red-400 capitalize h-8 rounded-lg">
                                    <i class="fa-solid fa-trash pr-2"></i>hapus
                                </label>
                            </a>
                        </div>
                    </div>
                    <div class="bg-green-300 w-full h-full gap-4 flex items-center justify-center flex-col" v-else>
                        <article class="prose">
                            <h3>{{ data.nama }}</h3>
                        </article>
                        <div class="grid grid-cols-2 text-white">
                            <a href="#modal-edit">
                                <label @click="edit(data.id)"
                                    class="flex justify-center items-center modal-button w-24 bg-blue-500 hover:bg-blue-400 capitalize h-8 rounded-lg mr-2">
                                    <i class="fa-solid fa-pen-to-square pr-2"></i>edit
                                </label>
                            </a>
                            <a href="#modal-hapus">
                                <label @click="hapus(data.id)"
                                    class="flex justify-center items-center modal-button w-24 bg-red-500 hover:bg-red-400 capitalize h-8 rounded-lg">
                                    <i class="fa-solid fa-trash pr-2"></i>hapus
                                </label>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Status</th>
                            <th>Opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in filteredItems" :key="index">
                            <td>{{ data.nama }}</td>
                            <td v-if="data.status == 0">Tidak Aktif</td>
                            <td v-if="data.status == 1">Aktif</td>
                            <td class="text-white flex flex-row">
                                <a href="#modal-edit">
                                    <label
                                        @click="edit(data.id)"
                                        class="flex justify-center items-center modal-button w-24 bg-blue-500 hover:bg-blue-400 capitalize h-8 rounded-lg mr-2"
                                    >
                                        <i
                                            class="fa-solid fa-pen-to-square pr-2"
                                        ></i
                                        >edit
                                    </label>
                                </a>
                                <a href="#modal-hapus">
                                    <label
                                        @click="hapus(data.id)"
                                        class="flex justify-center items-center modal-button w-24 bg-red-500 hover:bg-red-400 capitalize h-8 rounded-lg"
                                    >
                                        <i class="fa-solid fa-trash pr-2"></i
                                        >hapus
                                    </label>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> -->
        </template>
    </blankVue>
</template>
<script>
    import {
        useForm
    } from "@inertiajs/inertia-vue3";
    import {
        reactive
    } from "vue";
    import route from "../../../../vendor/tightenco/ziggy/src/js";
    import blankVue from "../Template/blank.vue";

    export default {
        components: {
            blankVue,
        },
        props: {
            meja: Array,
            errors: Object,
            flash: Object,
        },
        setup() {
            const formbarcode = useForm({
                id: null
            });

            function submitbarcode() {
                window.open(route("cetakbarcode",{id: formbarcode.id}))
            }

            const formtambah = useForm({
                nama: null,
                status: 0,
            });

            function submittambah() {
                this.formtambah.post(route("mastermeja.store"), {
                    onSuccess: () => {
                        formtambah.reset(), klik();
                    },
                });
            }

            const formedit = useForm({
                id: null,
                nama: null,
                status: 0,
            });

            function submitedit() {
                this.formedit.put(
                    route("mastermeja.update", {
                        meja: this.formedit.id
                    }), {
                        onSuccess: () => {
                            formedit.reset(), klik();
                        },
                    }
                );
            }

            function klik() {
                document.getElementById("submit").click();
            }
            const formhapus = useForm({
                id: null,
                nama: null,
            });

            function submithapus() {
                this.formhapus.delete(
                    route("mastermeja.destroy", {
                        meja: this.formhapus.id
                    }), {
                        onSuccess: () => {
                            formhapus.reset(), klik();
                        },
                    }
                );
            }
            const search = reactive({
                value: "",
            });
            return {
                formbarcode,
                submitbarcode,
                formhapus,
                submithapus,
                formedit,
                submitedit,
                formtambah,
                submittambah,
                search,
            };
        },
        data() {
            return {
                alert_success: null,
                alert_warning: null,
                alert_danger: null,
            };
        },
        updated() {
            if (this.flash.alert) {
                if (this.flash.alert["type"] == "success") {
                    this.alert_success = this.flash.alert["message"];
                    setTimeout(() => (this.alert_success = null), 5000);
                }
                if (this.flash.alert["type"] == "warning") {
                    this.alert_warning = this.flash.alert["message"];
                    setTimeout(() => (this.alert_warning = null), 5000);
                }
                if (this.flash.alert["type"] == "danger") {
                    this.alert_danger = this.flash.alert["message"];
                    setTimeout(() => (this.alert_danger = null), 5000);
                }
            }
        },
        mounted() {
            window.onafterprint = back;

        function back() {
            window.history.back();
        }
        },
        methods: {
            edit(id) {
                var data;
                this.meja.filter((items) => {
                    if (items.id == id) {
                        data = items;
                    }
                });
                this.formedit.id = data.id;
                this.formedit.nama = data.nama;
                this.formedit.taking_order = data.taking_order;
            },
            hapus(id) {
                var data;
                this.meja.filter((items) => {
                    if (items.id == id) {
                        data = items;
                    }
                });
                this.formhapus.id = data.id;
                this.formhapus.nama = data.nama;
            },
            barcode_data() {
                var barcode = document.getElementsByName('barcode')
                var master = [];
                var cek = 0
                barcode.forEach(items => {
                    if (items.checked == true) {
                        cek++
                        master.push(items.value)
                    }
                })
                if(cek > 0){
                    this.formbarcode.id = master
                }
                else{
                    this.formbarcode.id = null
                }
            }
        },
        computed: {
            filteredItems() {
                return this.meja.filter((item) => {
                    return (
                        item.nama
                        .toLowerCase()
                        .indexOf(this.search.value.toLowerCase()) > -1
                    );
                });
            },
        },
    };

</script>
<style lang=""></style>
