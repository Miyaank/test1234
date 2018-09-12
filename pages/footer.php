<footer class="footer_section" id="contact">
		<div class="container">
			<section class="main-section contact" id="contact">
				<div class="contact_section">
					<h2>Contact Us</h2>
					<div class="row">
						<div class="col-lg-4">
							<div class="contact_block">
								<div class="contact_block_icon rollIn animated wow"><span><i class="fa fa-home"></i></span></div>
								<span>
VM Technocrats, MZ41, Bansi Trade Center <br>
             452001 Indore , Madhya Pradesh   </span> </div>
						</div>
						<div class="col-lg-4">
							<div class="contact_block">
								<a href="tel:9926398798">
								<div class="contact_block_icon icon2 rollIn animated wow"><span><i class="fa fa-phone"></i></span></div>
							 +91 9926398798  </div></a>
						</div>
						<div class="col-lg-4">
							<div class="contact_block">
								<a href="mailto:hr@vmtechnocrats.com">
								<div class="contact_block_icon icon3 rollIn animated wow"><span><i class="fa fa-pencil"></i></span></div>
								<span> hr@vmtechnocrats.com </span> </div>
							</a>
						</div>
					</div>
				</div>
				<div class="row contact_section">
						<div class="col-lg-6 wow fadeInUp">
								<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeAeOBvkCvzbsnNfS34Kw9nCvq3rqRHulZxF4oslCnfZvkFLw/viewform?embedded=true" width="100%" height="1000" frameborder="0" marginheight="0" marginwidth="100">Loading...</iframe>
							</div>
						<div class="col-lg-6 wow contact_section fadeInLeft">

					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.1201544954656!2d75.87935731496235!3d22.723774985105244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd3f3a2a8ab1%3A0xb442be151e7fbff6!2sVM+Technocrats!5e0!3m2!1sen!2sin!4v1535279566201" width="100%" height="957" frameborder="0" style="border:0" allowfullscreen></iframe>
                     </div>
				
					<div class="col-lg-6 wow fadeInLeft">
						<ul class="social-link">
							<li class="twitter animated bounceIn wow delay-02s"><a href="javascript:void(0)"><i class="fa fa-twitter"></i></a></li>
							<li class="facebook animated bounceIn wow delay-03s"><a href="javascript:void(0)"><i class="fa fa-facebook"></i></a></li>
							<li class="pinterest animated bounceIn wow delay-04s"><a href="javascript:void(0)"><i class="fa fa-whatsapp"></i></a></li>
							<li class="gplus animated bounceIn wow delay-05s"><a href="javascript:void(0)"><i class="fa fa-google-plus"></i></a></li>
						</ul>
					</div>
				
					
				</div>
			</section>
		</div>
		<div class="container">
			<div class="footer_bottom">
				<span>© Butterfly Theme</span>
				<div class="credits">
					<!--
            All the links in the footer should remain intact.
            You can delete the links only if you purchased the pro version.
            Licensing information: https://bootstrapmade.com/license/
            Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=Butterfly
          -->
					Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
				</div>
			</div>
		</div>
		
	</footer>
	<script>
		wow = new WOW({
			animateClass: 'animated',
			offset: 100
		});
		wow.init();
		document.getElementById('').onclick = function() {
			var section = document.createElement('section');
			section.className = 'wow fadeInDown';
			section.className = 'wow shake';
			section.className = 'wow zoomIn';
			section.className = 'wow lightSpeedIn';
			this.parentNode.insertBefore(section, this);
		};
	</script>
	<script type="text/javascript">
		$(window).load(function() {

			$('a').bind('click', function(event) {
				var $anchor = $(this);

				$('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top - 91
				}, 1500, 'easeInOutExpo');
				/*
				if you don't want to use the easing effects:
				$('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top
				}, 1000);
				*/
				event.preventDefault();
			});
		})
	</script>

	<script type="text/javascript">
		jQuery(document).ready(function($) {
			// Portfolio Isotope
			var container = $('#portfolio-wrap');


			container.isotope({
				animationEngine: 'best-available',
				animationOptions: {
					duration: 200,
					queue: false
				},
				layoutMode: 'fitRows'
			});

			$('#filters a').click(function() {
				$('#filters a').removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				container.isotope({
					filter: selector
				});
				setProjects();
				return false;
			});


			function splitColumns() {
				var winWidth = $(window).width(),
					columnNumb = 1;


				if (winWidth > 1024) {
					columnNumb = 4;
				} else if (winWidth > 900) {
					columnNumb = 2;
				} else if (winWidth > 479) {
					columnNumb = 2;
				} else if (winWidth < 479) {
					columnNumb = 1;
				}

				return columnNumb;
			}

			function setColumns() {
				var winWidth = $(window).width(),
					columnNumb = splitColumns(),
					postWidth = Math.floor(winWidth / columnNumb);

				container.find('.portfolio-item').each(function() {
					$(this).css({
						width: postWidth + 'px'
					});
				});
			}

			function setProjects() {
				setColumns();
				container.isotope('reLayout');
			}

			container.imagesLoaded(function() {
				setColumns();
			});


			$(window).bind('resize', function() {
				setProjects();
			});

		});
		$(window).load(function() {
			jQuery('#all').click();
			return false;
		});
	</script>
	<script src="contactform/contactform.js"></script>

</body>
</html>

