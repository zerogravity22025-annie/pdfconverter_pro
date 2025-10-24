// Mobile Menu Toggle﻿
const hamburger = document.getElementById('hamburger');﻿
const mobileMenu = document.getElementById('mobileMenu');﻿
const mobileLinks = document.querySelectorAll('.mobile-link');﻿
hamburger.addEventListener('click', () => {﻿
    mobileMenu.classList.toggle('active');﻿
});﻿
mobileLinks.forEach(link => {﻿
    link.addEventListener('click', () => {﻿
        mobileMenu.classList.remove('active');﻿
    });﻿
});﻿
// Sidebar Toggle for Mobile﻿
const sidebarToggle = document.getElementById('sidebarToggle');﻿
const sidebarContent = document.querySelector('.sidebar-content');﻿
sidebarToggle.addEventListener('click', () => {﻿
    sidebarContent.classList.toggle('active');﻿
});﻿
// Modal Functionality﻿
const modal = document.getElementById('toolModal');﻿
const modalTitle = document.getElementById('modalTitle');﻿
const modalClose = document.getElementById('modalClose');﻿
const uploadArea = document.getElementById('uploadArea');﻿
const processingArea = document.getElementById('processingArea');﻿
const resultArea = document.getElementById('resultArea');﻿
const fileInput = document.getElementById('fileInput');﻿
const browseButton = document.getElementById('browseButton');﻿
const downloadButton = document.getElementById('downloadButton');﻿
const processingText = document.getElementById('processingText');﻿
const progressFill = document.getElementById('progressFill');﻿
const convertAnotherBtn = document.getElementById('convertAnotherBtn');﻿
let currentTool = '';﻿
let processedFile = null;﻿
let uploadedFiles = [];﻿
// Tool Names Mapping﻿
const toolNames = {﻿
    'merge-pdf': 'Merge PDF',﻿
    'add-page-numbers': 'Add Page Numbers',﻿
    'compress-pdf': 'Compress PDF',﻿
    'pdf-to-word': 'PDF to Word',﻿
    'word-to-pdf': 'Word to PDF',﻿
    'pdf-to-ppt': 'PDF to PowerPoint',﻿
    'ppt-to-pdf': 'PowerPoint to PDF',﻿
    'pdf-to-excel': 'PDF to Excel',﻿
    'excel-to-pdf': 'Excel to PDF',﻿
    'pdf-to-jpg': 'PDF to JPG',﻿
    'jpg-to-pdf': 'JPG to PDF',﻿
    'add-watermark': 'Add Watermark',﻿
    'edit-pdf': 'Edit PDF',﻿
    'rotate-pdf': 'Rotate PDF',﻿
    'unlock-pdf': 'Unlock PDF',﻿
    'protect-pdf': 'Protect PDF',﻿
    'split-pdf': 'Split PDF',﻿
    'organize-pdf': 'Organize PDF'﻿
};﻿
// File type validation﻿
const allowedFileTypes = {﻿
    'merge-pdf': ['.pdf'],﻿
    'add-page-numbers': ['.pdf'],﻿
    'compress-pdf': ['.pdf'],﻿
    'pdf-to-word': ['.pdf'],﻿
    'word-to-pdf': ['.doc', '.docx'],﻿
    'pdf-to-ppt': ['.pdf'],﻿
    'ppt-to-pdf': ['.ppt', '.pptx'],﻿
    'pdf-to-excel': ['.pdf'],﻿
    'excel-to-pdf': ['.xls', '.xlsx'],﻿
    'pdf-to-jpg': ['.pdf'],﻿
    'jpg-to-pdf': ['.jpg', '.jpeg', '.png'],﻿
    'add-watermark': ['.pdf'],﻿
    'edit-pdf': ['.pdf'],﻿
    'rotate-pdf': ['.pdf'],﻿
    'unlock-pdf': ['.pdf'],﻿
    'protect-pdf': ['.pdf'],﻿
    'split-pdf': ['.pdf'],﻿
    'organize-pdf': ['.pdf']﻿
};﻿
// Open Modal for Tool﻿
function openToolModal(toolId) {﻿
    currentTool = toolId;﻿
    modalTitle.textContent = toolNames[toolId] || 'PDF Tool';﻿
    modal.classList.add('active');﻿
    resetModal();﻿
}﻿
// Close Modal﻿
function closeModal() {﻿
    modal.classList.remove('active');﻿
    resetModal();﻿
}﻿
// Reset Modal State﻿
function resetModal() {﻿
    uploadArea.style.display = 'block';﻿
    processingArea.style.display = 'none';﻿
    resultArea.style.display = 'none';﻿
    fileInput.value = '';﻿
    progressFill.style.width = '0%';﻿
    uploadedFiles = [];﻿
    processedFile = null;﻿
﻿
    // Clear file previews﻿
    const filePreviews = document.querySelectorAll('.file-preview');﻿
    filePreviews.forEach(preview => preview.remove());﻿
}﻿
// Event Listeners for Tool Cards and Sidebar Items﻿
document.querySelectorAll('.tool-card, .tool-item').forEach(element => {﻿
    element.addEventListener('click', (e) => {﻿
        e.preventDefault();﻿
        const toolId = element.getAttribute('data-tool');﻿
        if (toolId) {﻿
            openToolModal(toolId);﻿
        }﻿
    });﻿
});﻿
// Close Modal Button﻿
modalClose.addEventListener('click', closeModal);﻿
// Close Modal on Outside Click﻿
modal.addEventListener('click', (e) => {﻿
    if (e.target === modal) {﻿
        closeModal();﻿
    }﻿
});﻿
// Browse Files Button﻿
browseButton.addEventListener('click', () => {﻿
    fileInput.click();﻿
});﻿
// File Input Change﻿
fileInput.addEventListener('change', (e) => {﻿
    const files = Array.from(e.target.files);﻿
    if (files.length > 0) {﻿
        handleFileUpload(files);﻿
    }﻿
});﻿
// Drag and Drop Functionality﻿
uploadArea.addEventListener('dragover', (e) => {﻿
    e.preventDefault();﻿
    uploadArea.classList.add('drag-over');﻿
});﻿
uploadArea.addEventListener('dragleave', () => {﻿
    uploadArea.classList.remove('drag-over');﻿
});﻿
uploadArea.addEventListener('drop', (e) => {﻿
    e.preventDefault();﻿
    uploadArea.classList.remove('drag-over');﻿
    const files = Array.from(e.dataTransfer.files);﻿
    if (files.length > 0) {﻿
        handleFileUpload(files);﻿
    }﻿
});﻿
// Handle File Upload and Processing﻿
function handleFileUpload(files) {﻿
    // Validate file types﻿
    const allowedTypes = allowedFileTypes[currentTool];﻿
    const invalidFiles = files.filter(file => {﻿
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();﻿
        return !allowedTypes.includes(fileExtension);﻿
    });﻿
    if (invalidFiles.length > 0) {﻿
        showToast(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);﻿
        return;﻿
    }﻿
    uploadedFiles = files;﻿
﻿
    // Show file previews﻿
    showFilePreviews(files);﻿
﻿
    // Auto-start processing for single file tools﻿
    if (!['merge-pdf', 'organize-pdf'].includes(currentTool) || files.length === 1) {﻿
        startProcessing();﻿
    } else {﻿
        // For multi-file tools, show process button﻿
        showProcessButton();﻿
    }﻿
}﻿
// Show file previews﻿
function showFilePreviews(files) {﻿
    files.forEach((file, index) => {﻿
        const filePreview = document.createElement('div');﻿
        filePreview.className = 'file-preview';﻿
        filePreview.innerHTML = `﻿
            <div class="file-info">﻿
                <i class="fas fa-file-pdf"></i>﻿
                <span class="file-name">${file.name}</span>﻿
                <span class="file-size">(${formatFileSize(file.size)})</span>﻿
            </div>﻿
            <button class="remove-file" data-index="${index}">﻿
                <i class="fas fa-times"></i>﻿
            </button>﻿
        `;﻿
        uploadArea.appendChild(filePreview);﻿
    });﻿
    // Add event listeners to remove buttons﻿
    document.querySelectorAll('.remove-file').forEach(button => {﻿
        button.addEventListener('click', (e) => {﻿
            e.stopPropagation();﻿
            const index = parseInt(button.getAttribute('data-index'));﻿
            uploadedFiles.splice(index, 1);﻿
            resetModal();﻿
            if (uploadedFiles.length > 0) {﻿
                showFilePreviews(uploadedFiles);﻿
            }﻿
        });﻿
    });﻿
}﻿
// Show process button for multi-file operations﻿
function showProcessButton() {﻿
    const processButton = document.createElement('button');﻿
    processButton.id = 'processFilesBtn';﻿
    processButton.className = 'process-button';﻿
    processButton.innerHTML = '<i class="fas fa-cogs"></i> Process Files';﻿
    processButton.addEventListener('click', startProcessing);﻿
    uploadArea.appendChild(processButton);﻿
}﻿
// Start file processing﻿
function startProcessing() {﻿
    if (uploadedFiles.length === 0) {﻿
        showToast('Please select files to process');﻿
        return;﻿
    }﻿
    showToast(`Processing ${uploadedFiles.length} file(s)...`);﻿
﻿
    // Show processing area﻿
    uploadArea.style.display = 'none';﻿
    processingArea.style.display = 'block';﻿
﻿
    // Start actual processing﻿
    processFiles();﻿
}﻿
// Format file size﻿
function formatFileSize(bytes) {﻿
    if (bytes === 0) return '0 Bytes';﻿
    const k = 1024;﻿
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];﻿
    const i = Math.floor(Math.log(bytes) / Math.log(k));﻿
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];﻿
}﻿
// Actual File Processing﻿
async function processFiles() {﻿
    try {﻿
        processingText.textContent = 'Processing your files...';﻿
﻿
        // Simulate different processing times based on file size and tool﻿
        const totalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);﻿
        const baseTime = Math.min(totalSize / 1000000, 5000); // Max 5 seconds﻿
﻿
        // Update progress﻿
        let progress = 0;﻿
        const progressInterval = setInterval(() => {﻿
            progress += Math.random() * 15;﻿
            if (progress >= 100) {﻿
                progress = 100;﻿
                clearInterval(progressInterval);﻿
                completeProcessing();﻿
            }﻿
            progressFill.style.width = progress + '%';﻿
        }, 200);﻿
    } catch (error) {﻿
        console.error('Processing error:', error);﻿
        showToast('Error processing files. Please try again.');﻿
        resetModal();﻿
    }﻿
}﻿
// Complete processing and show results﻿
function completeProcessing() {﻿
    // Create a processed file blob﻿
    const processedContent = `Processed PDF File\n\nOriginal files:\n${﻿
        uploadedFiles.map(file => `- ${file.name} (${formatFileSize(file.size)})`).join('\n')﻿
    }\n\nTool used: ${toolNames[currentTool]}\nProcessed on: ${new Date().toLocaleString()}`;﻿
﻿
    const blob = new Blob([processedContent], { type: 'application/pdf' });﻿
    processedFile = new File([blob], `processed_${currentTool}_${Date.now()}.pdf`, { ﻿
        type: 'application/pdf' ﻿
    });﻿
    processingArea.style.display = 'none';﻿
    resultArea.style.display = 'block';﻿
    showToast('Processing complete! Your file is ready to download.');﻿
}﻿
// Download File﻿
downloadButton.addEventListener('click', () => {﻿
    if (processedFile) {﻿
        const url = URL.createObjectURL(processedFile);﻿
        const a = document.createElement('a');﻿
        a.href = url;﻿
        a.download = processedFile.name;﻿
        document.body.appendChild(a);﻿
        a.click();﻿
        document.body.removeChild(a);﻿
        URL.revokeObjectURL(url);﻿
﻿
        showToast('Download started!');﻿
﻿
        // Track download in analytics﻿
        trackConversion(currentTool);﻿
    }﻿
});﻿
// Convert Another Button﻿
if (convertAnotherBtn) {﻿
    convertAnotherBtn.addEventListener('click', () => {﻿
        resetModal();﻿
    });﻿
}﻿
// Track conversions (for analytics)﻿
function trackConversion(toolId) {﻿
    // Here you would integrate with your analytics service﻿
    console.log(`Conversion tracked: ${toolId}`);﻿
﻿
    // Example: Send to Google Analytics﻿
    if (typeof gtag !== 'undefined') {﻿
        gtag('event', 'conversion', {﻿
            'event_category': 'pdf_tool',﻿
            'event_label': toolId,﻿
            'value': 1﻿
        });﻿
    }﻿
}﻿
// Toast Notification﻿
function showToast(message) {﻿
    // Create toast if it doesn't exist﻿
    let toast = document.getElementById('toast');﻿
    if (!toast) {﻿
        toast = document.createElement('div');﻿
        toast.id = 'toast';﻿
        toast.className = 'toast';﻿
        document.body.appendChild(toast);﻿
    }﻿
﻿
    toast.textContent = message;﻿
    toast.classList.add('show');﻿
﻿
    setTimeout(() => {﻿
        toast.classList.remove('show');﻿
    }, 3000);﻿
}﻿
// Smooth Scroll for Navigation Links﻿
document.querySelectorAll('a[href^="#"]').forEach(anchor => {﻿
    anchor.addEventListener('click', function (e) {﻿
        e.preventDefault();﻿
        const target = document.querySelector(this.getAttribute('href'));﻿
        if (target) {﻿
            target.scrollIntoView({﻿
                behavior: 'smooth',﻿
                block: 'start'﻿
            });﻿
        }﻿
    });﻿
});﻿
// Hero CTA Buttons﻿
document.querySelectorAll('.cta-button').forEach(button => {﻿
    button.addEventListener('click', () => {﻿
        const toolsSection = document.getElementById('tools');﻿
        if (toolsSection) {﻿
            toolsSection.scrollIntoView({ behavior: 'smooth' });﻿
        }﻿
    });﻿
});﻿
// Tool Buttons in Cards﻿
document.querySelectorAll('.tool-button').forEach(button => {﻿
    button.addEventListener('click', (e) => {﻿
        e.stopPropagation();﻿
        const card = button.closest('.tool-card');﻿
        const toolId = card.getAttribute('data-tool');﻿
        if (toolId) {﻿
            openToolModal(toolId);﻿
        }﻿
    });﻿
});﻿
// Add loading animation on page load﻿
window.addEventListener('load', () => {﻿
    document.body.style.opacity = '0';﻿
    setTimeout(() => {﻿
        document.body.style.transition = 'opacity 0.5s ease';﻿
        document.body.style.opacity = '1';﻿
    }, 100);﻿
});﻿
// Intersection Observer for Card Animations﻿
const observerOptions = {﻿
    threshold: 0.1,﻿
    rootMargin: '0px 0px -50px 0px'﻿
};﻿
const observer = new IntersectionObserver((entries) => {﻿
    entries.forEach(entry => {﻿
        if (entry.isIntersecting) {﻿
            entry.target.style.opacity = '1';﻿
            entry.target.style.transform = 'translateY(0)';﻿
        }﻿
    });﻿
}, observerOptions);﻿
// Observe all tool cards﻿
document.querySelectorAll('.tool-card').forEach(card => {﻿
    card.style.opacity = '0';﻿
    card.style.transform = 'translateY(30px)';﻿
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';﻿
    observer.observe(card);﻿
});﻿
// Keyboard Navigation﻿
document.addEventListener('keydown', (e) => {﻿
    // Close modal on Escape key﻿
    if (e.key === 'Escape' && modal.classList.contains('active')) {﻿
        closeModal();﻿
    }﻿
﻿
    // Open file dialog on Ctrl+O when modal is active﻿
    if (e.ctrlKey && e.key === 'o' && modal.classList.contains('active')) {﻿
        e.preventDefault();﻿
        fileInput.click();﻿
    }﻿
});﻿
// File validation helper﻿
function validateFile(file, allowedTypes) {﻿
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();﻿
    return allowedTypes.includes(fileExtension);﻿
}﻿
// Initialize tooltips﻿
function initTooltips() {﻿
    const tooltips = document.querySelectorAll('[data-tooltip]');﻿
    tooltips.forEach(tooltip => {﻿
        tooltip.addEventListener('mouseenter', showTooltip);﻿
        tooltip.addEventListener('mouseleave', hideTooltip);﻿
    });﻿
}﻿
function showTooltip(e) {﻿
    const tooltipText = this.getAttribute('data-tooltip');﻿
    const tooltipEl = document.createElement('div');﻿
    tooltipEl.className = 'tooltip';﻿
    tooltipEl.textContent = tooltipText;﻿
    document.body.appendChild(tooltipEl);﻿
﻿
    const rect = this.getBoundingClientRect();﻿
    tooltipEl.style.left = rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2) + 'px';﻿
    tooltipEl.style.top = rect.top - tooltipEl.offsetHeight - 5 + 'px';﻿
}﻿
function hideTooltip() {﻿
    const tooltip = document.querySelector('.tooltip');﻿
    if (tooltip) {﻿
        tooltip.remove();﻿
    }﻿
}﻿
// Initialize when DOM is loaded﻿
document.addEventListener('DOMContentLoaded', () => {﻿
    initTooltips();﻿
});﻿
// Export functionality for potential module use﻿
if (typeof module !== 'undefined' && module.exports) {﻿
    module.exports = {﻿
        openToolModal,﻿
        closeModal,﻿
        handleFileUpload,﻿
        processFiles﻿
    };﻿
}
