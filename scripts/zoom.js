document.addEventListener('DOMContentLoaded', function() {
    // Apply zoom to entire document
    function applyZoom() {
        document.body.style.zoom = "0.7";
        
        // Alternative for Firefox
        document.body.style.MozTransform = "scale(0.7)";
        document.body.style.MozTransformOrigin = "top left";
        
        // Set width to compensate for scaling
        document.body.style.width = "142.857%";
    }
    
    // Apply the zoom
    applyZoom();
    
    // Re-apply on window resize
    window.addEventListener('resize', applyZoom);
});