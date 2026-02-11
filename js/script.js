const participants = [
    { name: "Andi Susanto", agency: "CV Maju Jaya", status: "Lunas" },
    { name: "Bunga Citra", agency: "Pribadi", status: "Pending" },
    { name: "Candra Kurniawan", agency: "PT Sejahtera", status: "Lunas" },
    { name: "Dewi Lestari", agency: "Umum", status: "Lunas" },
    { name: "Eko Prasetyo", agency: "UMKM Bakso Enak", status: "Lunas" },
    { name: "Fajar Ramadhan", agency: "Digital Agency", status: "Lunas" },
    { name: "Gita Permata", agency: "Pribadi", status: "Pending" },
    { name: "Hadi Saputra", agency: "StartUp Lab", status: "Lunas" },
    { name: "Indah Wahyuni", agency: "Freelance", status: "Lunas" },
    { name: "Joko Widodo", agency: "Pemerintah Kota", status: "Lunas" }
];

// Generate IDs automatically
participants.forEach((p, index) => {
    // Format ID: AFB-DM05-001
    const idNumber = String(index + 1).padStart(3, '0');
    p.id = `AFB-DM05-${idNumber}`;
});

// DOM Elements
const tableBody = document.querySelector('#participantsTable tbody');
const statusFilter = document.getElementById('statusFilter');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const btnDaftar = document.getElementById('btn-daftar-nav');
const btnInfo = document.getElementById('btn-info-lengkap');
const totalParticipantsEl = document.getElementById('totalParticipants');
const verificationPercentEl = document.getElementById('verificationPercent');
const smartSummaryText = document.getElementById('smartSummaryText');

// Render Function
function renderTable(data) {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    // Update Smart Stats & Analytics
    const totalTalents = participants.length;
    const currentCount = data.length;
    const paidCount = data.filter(p => p.status === 'Lunas').length;
    const totalPaidInSystem = participants.filter(p => p.status === 'Lunas').length;

    const paidPercentage = totalTalents > 0 ? Math.round((totalPaidInSystem / totalTalents) * 100) : 0;

    if (totalParticipantsEl) totalParticipantsEl.textContent = currentCount;
    if (verificationPercentEl) verificationPercentEl.textContent = `${paidPercentage}%`;

    // Smart Summary Logic
    if (smartSummaryText) {
        if (currentCount === totalTalents) {
            smartSummaryText.textContent = `System Synced: ${paidPercentage}% Talents Verified`;
        } else {
            smartSummaryText.textContent = `Filtered: ${currentCount} matching records found`;
        }
    }

    if (data.length === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
        // Clear table body when no results
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #94a3b8;">No data synchronized with current filters</td></tr>';
        return;
    } else {
        if (emptyState) emptyState.classList.add('hidden');
    }

    data.forEach((participant, index) => {
        const row = document.createElement('tr');

        let statusClass = '';
        let statusText = '';

        switch (participant.status) {
            case 'Lunas':
                statusClass = 'status-lunas';
                statusText = 'VERIFIED';
                break;
            case 'Pending':
                statusClass = 'status-pending';
                statusText = 'PENDING';
                break;
            case 'Expired':
                statusClass = 'status-expired';
                statusText = 'EXPIRED';
                break;
            default:
                statusClass = 'status-pending';
                statusText = 'PENDING';
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td style="font-family: monospace; font-weight: 600; color: #64748b; letter-spacing: 1px;">#${participant.id}</td>
            <td><strong>${participant.name}</strong></td>
            <td><span style="color: #64748b;">${participant.agency}</span></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        `;

        tableBody.appendChild(row);
    });
}

// Filter Function
function filterData() {
    const statusValue = statusFilter.value;
    const searchValue = searchInput.value.toLowerCase();

    const filtered = participants.filter(p => {
        const matchesStatus = statusValue === 'all' || p.status === statusValue;
        const matchesSearch = p.name.toLowerCase().includes(searchValue) ||
            p.agency.toLowerCase().includes(searchValue) ||
            p.id.toLowerCase().includes(searchValue);
        return matchesStatus && matchesSearch;
    });

    renderTable(filtered);
}

// Event Listeners
statusFilter.addEventListener('change', filterData);
searchInput.addEventListener('input', filterData);

// Button Alerts & smooth scroll
const setupSmoothScroll = (btnId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }
};

setupSmoothScroll('btn-daftar-nav');
setupSmoothScroll('btn-info-lengkap');
setupSmoothScroll('btn-pendaftaran-hero'); // Ensuring both buttons work

// Countdown Timer Logic
function initCountdown() {
    const targetDate = new Date("October 18, 2027 00:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        if (document.getElementById("days")) {
            document.getElementById("days").innerText = String(days).padStart(2, '0');
            document.getElementById("hours").innerText = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        }

        if (distance < 0) {
            clearInterval(timer);
            if (document.getElementById("countdown")) {
                document.getElementById("countdown").innerHTML = "Pendaftaran Ditutup";
            }
        }
    }, 1000);
}

// Registration Form Logic
const regForm = document.getElementById('registrationForm');
const successOverlay = document.getElementById('registrationSuccess');
const paymentModal = document.getElementById('paymentModal');
const paymentCountdown = document.getElementById('paymentCountdown');
const successName = document.getElementById('successName');
const btnConfirmPayment = document.getElementById('btnConfirmPayment');
const paymentProof = document.getElementById('paymentProof');
const proofPreview = document.getElementById('proofPreview');
const uploadPlaceholder = document.querySelector('.upload-placeholder');

let currentRegistrant = null;
let paymentTimer = null;

if (regForm && successOverlay && paymentModal) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const btn = regForm.querySelector('button');

        // Loading State
        const btnSpan = btn.querySelector('span');
        btn.disabled = true;
        const originalText = btnSpan.innerText;
        btnSpan.innerHTML = '<span class="loading-spinner"></span> Syncing...';

        setTimeout(() => {
            // 1. Show Success Overlay
            successName.textContent = nameInput.value;
            successOverlay.classList.remove('hidden');

            // 2. Add New Data to Array
            const nextIndex = participants.length + 1;
            const idNumber = String(nextIndex).padStart(3, '0');
            const newId = `AFB-DM05-${idNumber}`;

            currentRegistrant = {
                id: newId,
                name: nameInput.value,
                agency: "Pendaftar Baru",
                status: "Pending", // Changed to Pending for international feel
                timestamp: new Date().getTime()
            };

            participants.push(currentRegistrant);
            renderTable(participants);

            // 3. Close Success, Open Payment after 2s
            setTimeout(() => {
                successOverlay.classList.add('hidden');
                paymentModal.classList.remove('hidden');
                startPaymentTimer(30 * 60); // 30 Minutes
                regForm.reset();
                btn.disabled = false;
                btnSpan.innerText = originalText;
            }, 2000);

        }, 1500);
    });

    // Payment Option Toggles
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');

            const target = opt.dataset.target;
            document.getElementById('qrisContent').classList.toggle('hidden', target !== 'qris');
            document.getElementById('transferContent').classList.toggle('hidden', target !== 'transfer');
        });
    });

    // Confirm Payment Simulation
    btnConfirmPayment.addEventListener('click', () => {
        if (!currentRegistrant || !paymentProof.files[0]) return;

        btnConfirmPayment.disabled = true;
        btnConfirmPayment.innerHTML = '<span class="loading-spinner"></span> Secure Uploading Proof...';

        setTimeout(() => {
            // Update status in array
            const idx = participants.findIndex(p => p.id === currentRegistrant.id);
            if (idx !== -1) {
                participants[idx].status = 'Lunas';
                renderTable(participants);
            }

            // Close Modal & Reset Proof
            paymentModal.classList.add('hidden');
            clearInterval(paymentTimer);
            resetUploadArea();

            // Smooth Scroll & Highlight
            const participantsSection = document.querySelector('#peserta');
            if (participantsSection) {
                participantsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            setTimeout(() => {
                const rows = tableBody.querySelectorAll('tr');
                const targetRow = Array.from(rows).find(r => r.innerText.includes(currentRegistrant.id));
                if (targetRow) {
                    targetRow.style.animation = 'highlightPulse 3s ease-out';
                }
            }, 800);

            alert("Bukti berhasil diunggah! Pembayaran Anda telah terverifikasi secara instan. Nama Anda kini Aktif di sistem!");
            btnConfirmPayment.disabled = true; // Stay disabled after reset
            btnConfirmPayment.innerText = 'Saya Sudah Bayar';
        }, 2500);
    });

    // Payment Proof Upload Logic
    if (paymentProof) {
        paymentProof.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    proofPreview.src = e.target.result;
                    proofPreview.classList.remove('hidden');
                    uploadPlaceholder.classList.add('hidden');
                    btnConfirmPayment.disabled = false;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function resetUploadArea() {
    if (paymentProof) {
        paymentProof.value = "";
        proofPreview.src = "";
        proofPreview.classList.add('hidden');
        uploadPlaceholder.classList.remove('hidden');
    }
}

function startPaymentTimer(duration) {
    let timer = duration, minutes, seconds;
    clearInterval(paymentTimer);

    paymentTimer = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        paymentCountdown.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(paymentTimer);
            handlePaymentExpired();
        }
    }, 1000);
}

function handlePaymentExpired() {
    if (!currentRegistrant) return;

    const idx = participants.findIndex(p => p.id === currentRegistrant.id);
    if (idx !== -1) {
        participants[idx].status = 'Expired';
        renderTable(participants);
    }

    paymentModal.classList.add('hidden');
    alert("Waktu pembayaran telah habis. Pendaftaran Anda otomatis dibatalkan (Expired).");
}

// Scroll Reveal Observer
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderTable(participants);
    initCountdown();
    initScrollReveal();

    // Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const allNavLinks = nav ? nav.querySelectorAll('a') : [];

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const isActive = nav.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('no-scroll', isActive);
        });

        // Close menu on any link click inside nav
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // FAQ Accordion Logic
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    console.log("Afbenesia Landing Page Loaded Successfully");
});
