document.addEventListener('DOMContentLoaded', () => {
    // Select all code blocks (pre tags)
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((codeBlock) => {
        // Create the container for relative positioning if not already wrapped
        // Jekyll usually wraps code in div.highlight, but let's be safe.
        // Actually, my CSS assumes .code-copy inside the pre or a wrapper. 
        // Let's put the button inside the pre block, positioned absolute.
        // But pre has overflow: auto, which might cut off the button if inside.
        // Better approach: Wrap the pre in a relative container if not present,
        // OR put the button inside the parent div if it exists.

        // Simpler approach for Jekyll default highlighter:
        // The `pre` usually has the class `highlight`.
        // Let's modify the pre to be position relative so the absolute button works.
        codeBlock.style.position = 'relative';

        const copyButton = document.createElement('button');
        copyButton.className = 'btn btn-sm btn-outline-secondary code-copy';
        copyButton.type = 'button';
        copyButton.innerHTML = '<span class="material-symbols-outlined fs-6">content_copy</span>';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');

        codeBlock.appendChild(copyButton);

        copyButton.addEventListener('click', () => {
            // Get the code text, ignoring the button itself
            // Clone the node to safely remove the button from the clone before getting text
            const clone = codeBlock.cloneNode(true);
            const btnInClone = clone.querySelector('.code-copy');
            if (btnInClone) btnInClone.remove();

            const codeText = clone.innerText;

            navigator.clipboard.writeText(codeText).then(() => {
                copyButton.innerHTML = '<span class="material-symbols-outlined fs-6">check</span>';
                copyButton.classList.remove('btn-outline-secondary');
                copyButton.classList.add('btn-outline-success');

                setTimeout(() => {
                    copyButton.innerHTML = '<span class="material-symbols-outlined fs-6">content_copy</span>';
                    copyButton.classList.remove('btn-outline-success');
                    copyButton.classList.add('btn-outline-secondary');
                }, 2000);
            }).catch((err) => {
                console.error('Failed to copy: ', err);
                copyButton.innerText = 'Error';
            });
        });
    });
});
