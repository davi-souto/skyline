function $_GET( index, divider = "?" ) {
	var url = document.location.href;

	if( url.indexOf( divider ) < 0 ) return null;

	var data = url.split(divider)[1];
	var opts = data.split("&");

	var params = {};
	for ( opt in opts ) {
		if( opts[opt].indexOf("=") > 0 ) {
			opts[opt] = opts[opt].split("=");
			params[ opts[opt][0] ] = opts[opt][1];
		} else {
			params[opts[opt]] = null;
		}
	}

	if( !index ) return params;

	if( index in params ) return params[ index ];

	return false;
}

$(function(){

	$("[data-toggle=\"tooltip\"]").tooltip();

	if( $.jMaskGlobals ) {
		$(".ag").mask("0000-0",{clearIfNotMatch:true});
		$(".acc").mask("000000-0",{clearIfNotMatch:true});
	}

	$(".login-form form").submit(function(e){

		var $form = $(this),
			$alert = $form.find(".alert").addClass("hide");

		var $ag = $form.find('.ag'),
			$acc = $form.find('.acc'),
			$pass = $form.find('.pass');

		if( $ag.val().length < 6 ) {
			$alert.removeClass('hide').find('span').html('Agência inválida');
			e.preventDefault();
		} else if( $acc.val().length < 8) {
			$alert.removeClass('hide').find('span').html('Conta inválida');
			e.preventDefault();
		} else if( $pass.val().length < 8) {
			$alert.removeClass('hide').find('span').html('Senha inválida');
			e.preventDefault();
		} else {
			localStorage.setItem('loggedIn', true);
		}
	})

	if( $("#transactions").length > 0 ) {
		var ctx = $("#transactions").get(0).getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'line',
			responsive: true,
			data: {
				labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
				datasets: [{
					label: 'Movimentações em R$ nos últimos meses',
					data: [12000, 19000, 3000, 5000, 14000, 3000],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
	}

	$(".operations .nav a").click(function(){
		$(this).tab('show');
	});

	$(".logout").click(function(){
		localStorage.clear()
		document.location.href = "login.html?logout=success";
	});

	if( $(".login-form").length > 0 ) {
		if( $_GET('logout') == "success" ) {
			$(".logout-info").removeClass("hide");

			setTimeout(function(){
				$(".logout-info").slideUp('slow', function(){
					$(this).addClass("hide");
					history.pushState(null,null, "login.html");
				})
			}, 5000);
		}
	}
})