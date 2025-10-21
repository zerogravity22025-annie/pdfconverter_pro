// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Sidebar Toggle for Mobile
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarContent = document.querySelector('.sidebar-content');

sidebarToggle.addEventListener('click', () => {
    sidebarContent.classList.toggle('active');
});

// Modal Functionality
const modal = document.getElementById('toolModal');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const uploadArea = document.getElementById('uploadArea');
const processingArea = document.getElementById('processingArea');
const resultArea = document.getElementById('resultArea');
const fileInput = document.getElementById('fileInput');
const browseButton = document.getElementById('browseButton');
const downloadButton = document.getElementById('downloadButton');
const processingText = document.getElementById('processingText');
const progressFill = document.getElementById('progressFill');

let currentTool = '';
let processedFile = null;

// Tool Names Mapping
const toolNames = {
    'merge-pdf': 'Merge PDF',
    'add-page-numbers': 'Add Page Numbers',
    'compress-pdf': 'Compress PDF',
    'pdf-to-word': 'PDF to Word',
    'word-to-pdf': 'Word to PDF',
    'pdf-to-ppt': 'PDF to PowerPoint',
    'ppt-to-pdf': 'PowerPoint to PDF',
    'pdf-to-excel': 'PDF to Excel',
    'excel-to-pdf': 'Excel to PDF',
    'pdf-to-jpg': 'PDF to JPG',
    'jpg-to-pdf': 'JPG to PDF',
    'add-watermark': 'Add Watermark',
    'edit-pdf': 'Edit PDF',
    'rotate-pdf': 'Rotate PDF',
    'unlock-pdf': 'Unlock PDF',
    'protect-pdf': 'Protect PDF',
    'split-pdf': 'Split PDF',
    'organize-pdf': 'Organize PDF'
};

// Open Modal for Tool
function openToolModal(toolId) {
    currentTool = toolId;
    modalTitle.textContent = toolNames[toolId] || 'PDF Tool';
    modal.classList.add('active');
    resetModal();
}

// Close Modal
function closeModal() {
    modal.classList.remove('active');
    resetModal();
}

// Reset Modal State
function resetModal() {
    uploadArea.style.display = 'block';
    processingArea.style.display = 'none';
    resultArea.style.display = 'none';
    fileInput.value = '';
    progressFill.style.width = '0%';
}

// Event Listeners for Tool Cards and Sidebar Items
document.querySelectorAll('.tool-card, .tool-item').forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        const toolId = element.getAttribute('data-tool');
        if (toolId) {
            openToolModal(toolId);
        }
    });
});

// Close Modal Button
modalClose.addEventListener('click', closeModal);

// Close Modal on Outside Click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Browse Files Button
browseButton.addEventListener('click', () => {
    fileInput.click();
});

// File Input Change
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFileUpload(file);
    }
});

// Drag and Drop Functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) {
        handleFileUpload(file);
    }
});

// Handle File Upload and Processing
function handleFileUpload(file) {
    showToast(`Uploading ${file.name}...`);
    
    // Show processing area
    uploadArea.style.display = 'none';
    processingArea.style.display = 'block';
    
    // Simulate upload progress
    processingText.textContent = 'Uploading...';
    let progress = 0;
    const uploadInterval = setInterval(() => {
        progress += 10;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(uploadInterval);
            processFile(file);
        }
    }, 150);
}

// Simulate File Processing
function processFile(file) {
    processingText.textContent = 'Processing...';
    progressFill.style.width = '0%';
    
    // Simulate processing
    let progress = 0;
    const processInterval = setInterval(() => {
        progress += 15;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(processInterval);
            showResult(file);
        }
    }, 200);
}

// Show Result
function showResult(file) {
    processedFile = file;
    processingArea.style.display = 'none';
    resultArea.style.display = 'block';
    showToast('Processing complete! Your file is ready.');
}

// Download File
downloadButton.addEventListener('click', () => {
    if (processedFile) {
        // Create a simulated download
        const blob = new Blob([`Processed file: ${processedFile.name}\nTool: ${toolNames[currentTool]}`], 
                              { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `processed_${processedFile.name}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('Download started!');
        setTimeout(() => {
            closeModal();
        }, 1500);
    }
});

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero CTA Buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        const toolsSection = document.getElementById('tools');
        if (toolsSection) {
            toolsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Tool Buttons in Cards
document.querySelectorAll('.tool-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = button.closest('.tool-card');
        const toolId = card.getAttribute('data-tool');
        if (toolId) {
            openToolModal(toolId);
        }
    });
});

// Add loading animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Intersection Observer for Card Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all tool cards
document.querySelectorAll('.tool-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Close modal on Escape key
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
    
    // Open file dialog on Ctrl+O when modal is active
    if (e.ctrlKey && e.key === 'o' && modal.classList.contains('active')) {
        e.preventDefault();
        fileInput.click();
    }
});
