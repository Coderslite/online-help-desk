<template>
    <div>
        <header>
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
                        data-mdb-target="#navbarExample01" aria-controls="navbarExample01" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarExample01">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item active">
                                <nuxt-link to="/" class="nav-link">Home</nuxt-link>
                            </li>
                            <li class="nav-item active">
                                <nuxt-link to="/About" class="nav-link">About</nuxt-link>
                            </li>

                        </ul>
                        <nuxt-link to="/Login" class="nav-link btn btn-primary text-white p-2">Get Started</nuxt-link>
                    </div>
                </div>
            </nav>
            <!-- Navbar -->
        </header>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>