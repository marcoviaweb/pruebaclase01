document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality
    const searchInput = document.getElementById('search-input');
    const commandCards = document.querySelectorAll('.command-card');
    const categorySections = document.querySelectorAll('.category-section');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        commandCards.forEach(card => {
            const keywords = card.getAttribute('data-keywords');
            const commandName = card.querySelector('.command-name').textContent.toLowerCase();
            const commandDesc = card.querySelector('.command-desc').textContent.toLowerCase();
            const code = card.querySelector('code').textContent.toLowerCase();

            const isMatch = keywords.includes(searchTerm) || 
                            commandName.includes(searchTerm) || 
                            commandDesc.includes(searchTerm) || 
                            code.includes(searchTerm);

            if (isMatch) {
                card.style.display = 'block';
                // Add a small animation for reappearing items
                card.style.animation = 'fadeIn 0.3s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });

        // Hide empty categories
        categorySections.forEach(section => {
            const visibleCards = section.querySelectorAll('.command-card[style="display: block"]');
            const allCardsHidden = Array.from(section.querySelectorAll('.command-card')).every(card => card.style.display === 'none');
            
            if (allCardsHidden && searchTerm !== '') {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    });

    // Copy to Clipboard Functionality
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = btn.parentElement.querySelector('code');
            const textToCopy = codeBlock.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalIcon = btn.innerHTML;
                
                // Change icon to checkmark
                btn.innerHTML = `<svg width="16" height="16" fill="none" stroke="#4ade80" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
                btn.style.borderColor = '#4ade80';

                // Revert after 2 seconds
                setTimeout(() => {
                    btn.innerHTML = originalIcon;
                    btn.style.borderColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // Add fade in animation keyframes if not already present
    if (!document.querySelector('#dynamic-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'dynamic-styles';
        styleSheet.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});
